import {
	INodeProperties,
} from 'n8n-workflow';

import {
	getPagingParameters,
} from '../GenericFunctions';

export const groupOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'group',
				],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Find All Groups',
			},
			{
				name: 'Create Group',
				value: 'createGroup',
				description: '',//todo
			},
			{
				name: 'Get Group',
				value: 'getGroup',
				description: '',
			},
			{
				name: 'Get All Members',
				value: 'getAllMembers',
				description: '',
			},
			{
				name: 'Add Member',
				value: 'addMember',
				description: '',
			},
			{
				name: 'Delete Member',
				value: 'deleteMember',
				description: '',
			},
		],
		default: 'createGroup',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const  groupFields = [

	/* -------------------------------------------------------------------------- */
	/*                                 group:getAll                               */
	/* -------------------------------------------------------------------------- */

	...getPagingParameters('group', 'getAll'),

	/* -------------------------------------------------------------------------- */
	/*                                 group:createGroup                          */
	/* -------------------------------------------------------------------------- */

	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'group',
				],
				operation: [
					'createGroup',
				],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'group',
				],
				operation: [
					'createGroup',
				],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'Show At Directory',
		name: 'show_at_directory',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [
					'group',
				],
				operation: [
					'createGroup',
				],
			},
		},
		default: false,
		description: '',
	},
	{
		displayName: 'Show At Registration',
		name: 'show_at_registration',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [
					'group',
				],
				operation: [
					'createGroup',
				],
			},
		},
		default: false,
		description: '',
	},
	{
		displayName: 'Sort Order',
		name: 'sort_order',
		type: 'number',
		typeOptions: {
			numberStepSize: 1,
		},
		displayOptions: {
			show: {
				resource: [
					'group',
				],
				operation: [
					'createGroup',
				],
			},
		},
		default: '',
		description: '',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 group:getGroup                              */
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
					'group',
				],
				operation: [
					'getGroup',
				],
			},
		},
		default: '',
		description: 'The ID of the group.',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 group:getAllMembers                              */
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
					'group',
				],
				operation: [
					'getAllMembers',
				],
			},
		},
		default: '',
		description: 'The ID of the group they belong to.',
	},

	...getPagingParameters('group', 'getAllMembers'),

	/* -------------------------------------------------------------------------- */
	/*                                 group:addMember                              */
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
					'group',
				],
				operation: [
					'addMember',
				],
			},
		},
		default: '',
		description: 'The ID of the group that the member belongs to.',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		required: true,
        typeOptions: {
            numberStepSize: 1,
        },
		displayOptions: {
			show: {
				resource: [
					'group',
				],
				operation: [
					'addMember',
				],
			},
		},
		default: '',
		description: 'The ID of the user who will be added.',
	},
	{
		displayName: 'Is Manager',
		name: 'isManager',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [
					'group',
				],
				operation: [
					'addMember',
				],
			},
		},
		default: false,
		description: 'If the user is manager.',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 group:deleteMember                              */
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
					'group',
				],
				operation: [
					'deleteMember',
				],
			},
		},
		default: '',
		description: 'The ID of the group that the member belongs to.',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		required: true,
        typeOptions: {
            numberStepSize: 1,
        },
		displayOptions: {
			show: {
				resource: [
					'group',
				],
				operation: [
					'deleteMember',
				],
			},
		},
		default: '',
		description: 'The ID of the user who will be deleted.',
	},

] as INodeProperties[];
