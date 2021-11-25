import {
	INodeProperties,
} from 'n8n-workflow';

import {
	getPagingParameters
} from '../GenericFunctions';

export const cFileOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'cFile',
				],
			},
		},
		options: [
            {
				name: 'Get All',
				value: 'getAll',
				description: 'Find all files by content container',
			},
			{
				name: 'Upload',
				value: 'upload',
				description: 'Upload files',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get file info by id',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Deletes a file by id',
			},
		],
		default: 'getAllDirectories',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const  cFileFields = [

	/* -------------------------------------------------------------------------- */
	/*                                 cFile:getAll                               */
	/* -------------------------------------------------------------------------- */

	{
		displayName: 'ID',
		name: 'id',
		type: 'number',
		required: true,
        typeOptions: {
            numberStepSize: 1,
        },
		displayOptions: {
			show: {
				resource: [
					'cFile',
				],
				operation: [
					'getAll',
				],
			},
		},
		default: '',
		description: 'The id of the content container.',
	},
    ...getPagingParameters('cFile'),

	/* -------------------------------------------------------------------------- */
	/*                                 cFile:upload                               */
	/* -------------------------------------------------------------------------- */

	{
		displayName: 'ID',
		name: 'id',
		type: 'number',
		required: true,
        typeOptions: {
            numberStepSize: 1,
        },
		displayOptions: {
			show: {
				resource: [
					'cFile',
				],
				operation: [
					'upload',
				],
			},
		},
		default: '',
		description: 'The id of the content container.',
	},
	{
		displayName: 'Folder ID',
		name: 'folder_id',
		type: 'number',
		required: true,
        typeOptions: {
            numberStepSize: 1,
        },
		displayOptions: {
			show: {
				resource: [
					'cFile',
				],
				operation: [
					'upload',
				],
			},
		},
		default: '',
		description: 'Id of the directory.',
	},

	{
		displayName: 'Binary Data',
		name: 'binaryDataUpload',
		type: 'boolean',
		default: false,
		required: true,
		displayOptions: {
			show: {
				resource: [
					'cFile',
				],
				operation: [
					'upload',
				],
			},
		},
		description: 'The file to upload.',
	},
	{
		displayName: 'File Content',
		name: 'fileContent',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: [
					'cFile',
				],
				operation: [
					'upload',
				],
				binaryDataUpload: [
					false,
				],
			},
		},
		placeholder: '',
		description: 'The text content of the file to upload.',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'cFile',
				],
				operation: [
					'upload',
				],
				binaryDataUpload: [
					true,
				],
			},
		},
		placeholder: '',
		description: 'Name of the binary property which contains the data for the file to be uploaded.',
	},


	/* -------------------------------------------------------------------------- */
	/*                                 cFile:get                              	  */
	/* -------------------------------------------------------------------------- */

    {
		displayName: 'ID',
		name: 'id',
		type: 'number',
		required: true,
        typeOptions: {
            numberStepSize: 1,
        },
		displayOptions: {
			show: {
				resource: [
					'cFile',
				],
				operation: [
					'get',
				],
			},
		},
		default: '',
		description: 'The id of the file.',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 cFile:delete                               */
	/* -------------------------------------------------------------------------- */

    {
		displayName: 'ID',
		name: 'id',
		type: 'number',
		required: true,
        typeOptions: {
            numberStepSize: 1,
        },
		displayOptions: {
			show: {
				resource: [
					'cFile',
				],
				operation: [
					'delete',
				],
			},
		},
		default: '',
		description: 'The id of the file.',
	},

] as INodeProperties[];
