import {
	INodeProperties,
} from 'n8n-workflow';

export const calendarParticipantOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'calendarParticipant',
				],
			},
		},
		options: [
			{
				name: 'Change Participant',
				value: 'changeParticipant',
				description: 'Change the user participant',
			},
		],
		default: 'getAll',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const  calendarParticipantFields = [

    /* -------------------------------------------------------------------------- */
	/*                  	 calendarParticipant:changeParticipant                */
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
					'calendarParticipant',
				],
				operation: [
					'changeParticipant',
				],
			},
		},
		default: '',
		description: 'The id of the calendar entry.',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'number',
        typeOptions: {
		    minValue: 0,
            maxValue: 3,
            numberStepSize: 1,
        },
		required: true,
		displayOptions: {
			show: {
				resource: [
					'calendarParticipant',
				],
				operation: [
					'changeParticipant',
				],
			},
		},
		default: '',
		description: 'Participant type: 1 - decline; 2 - maybe; 3 - accept; 0 - remove from participants.',
	},

] as INodeProperties[];
