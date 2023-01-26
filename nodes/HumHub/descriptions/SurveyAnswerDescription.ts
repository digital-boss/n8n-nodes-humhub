import {
	INodeProperties,
} from 'n8n-workflow';

import {
    getPagingParameters
} from '../GenericFunctions';

export const surveyAnswerOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'surveyAnswer',
				],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a survey answer by id',
			},

		],
		default: 'getAll',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const  surveyAnswerFields = [



	/* -------------------------------------------------------------------------- */
	/*                                 surveyAnswer:get                                   */
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
					'surveyAnswer',
				],
				operation: [
					'get',
				],
			},
		},
		default: '',
		description: 'The id of the survey answer.',
	},

] as INodeProperties[];
