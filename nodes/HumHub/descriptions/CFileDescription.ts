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
				name: 'Get All Directories',
				value: 'getAllDirectories',
				description: 'Find all folders by content container',
			},
			{
				name: 'Create Directory',
				value: 'createDirectory',
				description: 'Create new directory',
			},
			{
				name: 'Get Directory',
				value: 'getDirectory',
				description: 'Get directory by id',
			},
			{
				name: 'Update Directory',
				value: 'updateDirectory',
				description: 'Update directory by id',
			},
			{
				name: 'Delete Directory',
				value: 'deleteDirectory',
				description: 'Delete a directory by id',
			},
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
			{
				name: 'Make Public',
				value: 'makePublic',
				description: 'Make items public',
			},
			{
				name: 'Make Private',
				value: 'makePrivate',
				description: 'Make items private',
			},
			{
				name: 'Move To Folder',
				value: 'moveToFolder',
				description: 'Move items to another folder',
			},
			{
				name: 'Delete From Folder',
				value: 'deleteFromFolder',
				description: 'Delete items from folder',
			},
		],
		default: 'getAllDirectories',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const  cFileFields = [

	/* -------------------------------------------------------------------------- */
	/*                                 cFile:getAllDirectories                    */
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
					'getAllDirectories',
				],
			},
		},
		default: '',
		description: 'The id of content container.',
	},
    ...getPagingParameters('cFile', 'getAllDirectories'),

	/* -------------------------------------------------------------------------- */
	/*                                 cFile:createDirectory                      */
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
					'createDirectory',
				],
			},
		},
		default: '',
		description: 'The id of content container.',
	},
	{
		displayName: 'Target ID',
		name: 'targetId',
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
					'createDirectory',
				],
			},
		},
		default: '',
		description: 'The id of the target directory.',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
        displayOptions: {
            show: {
				resource: [
					'cFile',
				],
				operation: [
					'createDirectory',
				],
            },
        },
		default: '',
		description: '',
	},
	{
		displayName: 'Description',
		name: 'Description',
		type: 'string',
		default: '',
        displayOptions: {
            show: {
				resource: [
					'cFile',
				],
				operation: [
					'createDirectory',
				],
            },
        },
		description: '',
	},
	{
		displayName: 'Visibility',
		name: 'visibility',
		type: 'number',
        typeOptions: {
			minValue: 0,
			maxValue: 1,
            numberStepSize: 1,
        },
        displayOptions: {
            show: {
				resource: [
					'cFile',
				],
				operation: [
					'createDirectory',
				],
            },
        },
		default: '',
		description: 'Allowed visibility statuses: 0 - Private; 1 - Public',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 cFile:getDirectory                         */
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
					'getDirectory',
				],
			},
		},
		default: '',
		description: 'The id of the directory.',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 cFile:updateDirectory                      */
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
					'updateDirectory',
				],
			},
		},
		default: '',
		description: 'The id of the directory.',
	},
	{
		displayName: 'Target ID',
		name: 'targetId',
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
					'updateDirectory',
				],
			},
		},
		default: '',
		description: 'The id of the target directory',
	},
    {
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
        displayOptions: {
            show: {
				resource: [
					'cFile',
				],
				operation: [
					'updateDirectory',
				],
            },
        },
		default: '',
		description: '',
	},
	{
		displayName: 'Description',
		name: 'Description',
		type: 'string',
		default: '',
        displayOptions: {
            show: {
				resource: [
					'cFile',
				],
				operation: [
					'updateDirectory',
				],
            },
        },
		description: '',
	},
	{
		displayName: 'Visibility',
		name: 'visibility',
		type: 'number',
        typeOptions: {
			minValue: 0,
			maxValue: 1,
            numberStepSize: 1,
        },
        displayOptions: {
            show: {
				resource: [
					'cFile',
				],
				operation: [
					'updateDirectory',
				],
            },
        },
		default: '',
		description: 'Allowed visibility statuses: 0 - Private; 1 - Public',
	},


	/* -------------------------------------------------------------------------- */
	/*                                 cFile:deleteDirectory                      */
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
					'deleteDirectory',
				],
			},
		},
		default: '',
		description: 'The id of the directory.',
	},

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
		displayName: 'Files',
		name: 'files',
		type: 'string',
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
		default: '',
		description: 'The files to upload.',
	}, // todo Array of file

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

	/* -------------------------------------------------------------------------- */
	/*                                 cFile:makePublic                           */
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
					'makePublic',
				],
			},
		},
		default: '',
		description: 'The id of content container.',
	},
    {
		displayName: 'Selection',
		name: 'selection',
		type: 'string',
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
					'makePublic',
				],
			},
		},
		default: '',
		description: 'Item id in format {type}_{id}.',//todo
	},

	/* -------------------------------------------------------------------------- */
	/*                                 cFile:makePrivate                          */
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
					'makePrivate',
				],
			},
		},
		default: '',
		description: 'The id of content container.',
	},
    {
		displayName: 'Selection',
		name: 'selection',
		type: 'string',
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
					'makePrivate',
				],
			},
		},
		default: '',
		description: 'Item id in format {type}_{id}.',//todo
	},

	/* -------------------------------------------------------------------------- */
	/*                                 cFile:moveToFolder                         */
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
					'moveToFolder',
				],
			},
		},
		default: '',
		description: 'The id of content container.',
	},
    {
		displayName: 'Source ID',
		name: 'source_id',
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
					'moveToFolder',
				],
			},
		},
		default: '',
		description: '',
	},
    {
		displayName: 'Destination ID',
		name: 'destId',
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
					'moveToFolder',
				],
			},
		},
		default: '',
		description: '',
	},
    {
		displayName: 'Selection',
		name: 'selection',
		type: 'string',
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
					'moveToFolder',
				],
			},
		},
		default: '',
		description: 'Item id in format {type}_{id}.',//todo
	},

	/* -------------------------------------------------------------------------- */
	/*                                 cFile:deleteFromFolder                     */
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
					'comment',
				],
				operation: [
					'deleteFromFolder',
				],
			},
		},
		default: '',
		description: 'The ID of comment.',
	},
    {
		displayName: 'Selection',
		name: 'selection',
		type: 'string',
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
					'deleteFromFolder',
				],
			},
		},
		default: '',
		description: 'Item id in format {type}_{id}.',//todo
	},

] as INodeProperties[];
