import {
	INodeProperties,
} from 'n8n-workflow';

import {
    getPagingParameters
} from '../GenericFunctions';

export const surveyOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'survey',
				],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Find all surveys',
			},
			{
				name: 'Get All Global',
				value: 'getAllGlobal',
				description: 'Find all global surveys',
			},
			{
				name: 'Get All By Container',
				value: 'getAllByContainer',
				description: 'Find all surveys by container',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a survey by id',
			},

		],
		default: 'getAll',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const  surveyFields = [

	/* -------------------------------------------------------------------------- */
	/*                                 survey:getAll	                          */
	/* -------------------------------------------------------------------------- */

    ...getPagingParameters('survey'),

	/* -------------------------------------------------------------------------- */
	/*                                 survey:getAllGlobal	                      */
	/* -------------------------------------------------------------------------- */

    ...getPagingParameters('survey', 'getAllGlobal'),

	/* -------------------------------------------------------------------------- */
	/*                                 survey:getAllByContainer	                  */
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
					'survey',
				],
				operation: [
					'getAllByContainer',
				],
			},
		},
		default: '',
		description: 'The id of content container.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: [
					'survey',
				],
				operation: [
					'getAllByContainer',
				],
			},
		},
		default: [],
		description: '',
		options: [
			{
				displayName: 'Topics',
				name: 'topics',
				type: 'string',
				default: '',
				description: 'Comma separated list of topics to filter. Example: Music,Dancing',
			},
		],
	},
    ...getPagingParameters('survey', 'getAllByContainer'),

	/* -------------------------------------------------------------------------- */
	/*                                 survey:get                                 */
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
					'survey',
				],
				operation: [
					'get',
				],
			},
		},
		default: '',
		description: 'The id of the survey.',
	},

] as INodeProperties[];
