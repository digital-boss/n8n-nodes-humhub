import {
	INodeProperties,
} from 'n8n-workflow';

import {
    getPagingParameters
} from '../GenericFunctions';

export const surveyAnswersOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'surveyAnswers',
				],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Find all answers for survey',
			},

		],
		default: 'getAll',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const  surveyAnswersFields = [

	/* -------------------------------------------------------------------------- */
	/*                              surveyAnswers:getAll                          */
	/* -------------------------------------------------------------------------- */

	{
		displayName: 'Survey ID',
		name: 'surveyId',
		type: 'number',
		required: true,
		typeOptions: {
			numberStepSize: 1,
		},
		displayOptions: {
			show: {
				resource: [
					'surveyAnswers',
				],
				operation: [
					'getAll',
				],
			},
		},
		default: '',
		description: 'ID of the survey.',
	},
    ...getPagingParameters('surveyAnswers'),
	
] as INodeProperties[];
