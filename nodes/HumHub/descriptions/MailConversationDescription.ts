import {
	INodeProperties,
} from 'n8n-workflow';

import {
    getPagingParameters
} from '../GenericFunctions';

export const mailConversationOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'mailConversation',
				],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Find all conversations',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create conversation',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get conversation by id',
			},
		],
		default: 'getAll',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const  mailConversationFields = [

	/* -------------------------------------------------------------------------- */
	/*                                 mailConversation:getAll                              */
	/* -------------------------------------------------------------------------- */

    ...getPagingParameters('mailConversation'),

	/* -------------------------------------------------------------------------- */
	/*                                 mailConversation:create                              */
	/* -------------------------------------------------------------------------- */

	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'mailConversation',
				],
				operation: [
					'create',
				],
			},
		},
		default: '',
		description: 'Conversation title.',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'mailConversation',
				],
				operation: [
					'create',
				],
			},
		},
		default: '',
		description: 'First entry content.',
	},
	{
		displayName: 'Recipient',
		name: 'recipient',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'mailConversation',
				],
				operation: [
					'create',
				],
			},
		},
		default: '',
		description: 'Guid of users.', // todo Array of any
	},

	/* -------------------------------------------------------------------------- */
	/*                                 mailConversation:get                              */
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
					'mailConversation',
				],
				operation: [
					'get',
				],
			},
		},
		default: '',
		description: 'The id of conversation.',
	},

] as INodeProperties[];
