import {
	INodeProperties,
} from 'n8n-workflow';

export const fileOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'file',
				],
			},
		},
		options: [
			{
				name: 'Download',
				value: 'download',
				description: 'Downloads a file by id',
			},
		],
		default: 'download',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const  fileFields = [

	/* -------------------------------------------------------------------------- */
	/*                                 file:download                              */
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
					'file',
				],
				operation: [
					'download',
				],
			},
		},
		default: '',
		description: 'The ID of the file to download.',
	},

] as INodeProperties[];
