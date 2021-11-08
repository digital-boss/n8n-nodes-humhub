import {
	INodeProperties,
} from 'n8n-workflow';

import {
	getPagingParameters
} from '../GenericFunctions';

export const cFileItemManagementOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'cFileItemManagement',
				],
			},
		},
		options: [
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
		default: 'makePublic',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const  cFileItemManagementFields = [

	/* -------------------------------------------------------------------------- */
	/*                     		cFileItemManagement:makePublic             		  */
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
					'cFileItemManagement',
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
					'cFileItemManagement',
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
	/*                            cFileItemManagement:makePrivate                 */
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
					'cFileItemManagement',
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
					'cFileItemManagement',
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
	/*                        cFileItemManagement:moveToFolder           	      */
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
					'cFileItemManagement',
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
					'cFileItemManagement',
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
					'cFileItemManagement',
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
					'cFileItemManagement',
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
	/*                        cFileItemManagement:deleteFromFolder                */
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
					'cFileItemManagement',
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
					'cFileItemManagement',
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
