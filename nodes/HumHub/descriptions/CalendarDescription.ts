import {
	INodeProperties,
} from 'n8n-workflow';

import {
    getPagingParameters
} from '../GenericFunctions';

export const calendarOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'calendar',
				],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Find all calendars entries',
			},
			{
				name: 'Get All By Container',
				value: 'getAllByContainer',
				description: 'Find all calendar entries by container',
			},
			{
				name: 'Delete All By Container',
				value: 'deleteAllByContainer',
				description: 'Delete all calendar entries by container',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create new calendar entry',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get calendar entry by id',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update calendar entry by id',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete the calendar entry by id',
			},
			{
				name: 'Attach Files',
				value: 'attachFiles',
				description: 'Attach files to calendar entry',
			},
			{
				name: 'Remove File',
				value: 'removeFile',
				description: 'Remove file from calendar entry',
			},
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

export const  calendarFields = [

	/* -------------------------------------------------------------------------- */
	/*                                 calendar:getAll                            */
	/* -------------------------------------------------------------------------- */

    ...getPagingParameters('calendar'),

	/* -------------------------------------------------------------------------- */
	/*                                 calendar:getAllByContainer                 */
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
					'calendar',
				],
				operation: [
					'getAllByContainer',
				],
			},
		},
		default: '',
		description: 'ID of the content container.',
	},
    {
		displayName: 'Topics',
		name: 'topics',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'calendar',
				],
				operation: [
					'getAllByContainer',
				],
			},
		},
		default: '',
		description: 'Comma separated list of topics to filter. Example: Music,Dancing',
	},

    ...getPagingParameters('calendar', 'getAllByContainer'),

    /* -------------------------------------------------------------------------- */
	/*                                 calendar:deleteAllByContainer              */
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
					'calendar',
				],
				operation: [
					'deleteAllByContainer',
				],
			},
		},
		default: '',
		description: 'ID of the content container.',
	},

    /* -------------------------------------------------------------------------- */
	/*                                 calendar:create                            */
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
					'calendar',
				],
				operation: [
					'create',
				],
			},
		},
		default: '',
		description: 'ID of the content container.',
	},

	{
		displayName: 'Calendar Entry Title',
		name: 'calendarEntryTitle',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'calendar',
				],
				operation: [
					'create',
				],
			},
		},
		default: '',
		description: '',
	},
    {
		displayName: 'Calendar Entry Additional Fields',
		name: 'calendarEntryAdditionalFields',
		type: 'collection',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'calendar',
				],
				operation: [
					'create',
				],
			},
		},
		default: [],
		description: '',
		options: [
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'All Day',
				name: 'all_day',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Participation Mode',
				name: 'participation_mode',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Max Participants',
				name: 'max_participants',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Allow Decline',
				name: 'allow_decline',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Allow Maybe',
				name: 'allow_maybe',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Participant Info',
				name: 'participant_info',
				type: 'string',
				default: '',
				description: '',
			},
		],
	},
	{
		displayName: 'Calendar Entry Form Start Date',
		name: 'calendarEntryFormStartDate',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'calendar',
				],
				operation: [
					'create',
				],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'Calendar Entry Form End Date',
		name: 'calendarEntryFormEndDate',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'calendar',
				],
				operation: [
					'create',
				],
			},
		},
		default: '',
		description: '',
	},
    {
		displayName: 'Calendar Entry Form Additional Fields',
		name: 'calendarEntryFormAdditionalFields',
		type: 'collection',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'calendar',
				],
				operation: [
					'create',
				],
			},
		},
		default: [],
		description: '',
		options: [
			{
				displayName: 'Is Public',
				name: 'is_public',
				type: 'number',
				default: '',
				description: '',
			},

			{
				displayName: 'Start Time',
				name: 'start_time',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'End Time',
				name: 'end_time',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Time Zone',
				name: 'timeZone',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Force Join',
				name: 'forceJoin',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Topics',
				name: 'topics',
				type: 'string',
				default: '',
				description: '',
			}, // todo Array of integers <int64>
		],
	},

    /* -------------------------------------------------------------------------- */
	/*                                 calendar:get                               */
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
					'calendar',
				],
				operation: [
					'get',
				],
			},
		},
		default: '',
		description: 'The id of the calendar entry.',
	},

    /* -------------------------------------------------------------------------- */
	/*                                 calendar:update                            */
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
					'calendar',
				],
				operation: [
					'update',
				],
			},
		},
		default: '',
		description: 'The id of the calendar entry.',
	},
    {
		displayName: 'Calendar Entry',
		name: 'calendarEntry',
		type: 'collection',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'calendar',
				],
				operation: [
					'update',
				],
			},
		},
		default: [],
		description: '',
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Description',
				name: 'Description',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'All Day',
				name: 'all_day',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Participation Mode',
				name: 'participation_mode',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Max Participants',
				name: 'max_participants',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Allow Decline',
				name: 'allow_decline',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Allow Maybe',
				name: 'allow_maybe',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Participant Info',
				name: 'participant_info',
				type: 'string',
				default: '',
				description: '',
			},
		],
	},
    {
		displayName: 'Calendar Entry Form',
		name: 'calendarEntryForm',
		type: 'collection',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'calendar',
				],
				operation: [
					'update',
				],
			},
		},
		default: [],
		description: '',
		options: [
			{
				displayName: 'Is Public',
				name: 'is_public',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Start Time',
				name: 'start_time',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'End Date',
				name: 'end_date',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'End Time',
				name: 'end_time',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Time Zone',
				name: 'timeZone',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Force Join',
				name: 'forceJoin',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Topics',
				name: 'topics',
				type: 'string',
				default: '',
				description: '',
			}, // todo Array of integers <int64>
		],
	},

    /* -------------------------------------------------------------------------- */
	/*                                 calendar:delete                            */
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
					'calendar',
				],
				operation: [
					'delete',
				],
			},
		},
		default: '',
		description: 'The id of the calendar entry.',
	},

    /* -------------------------------------------------------------------------- */
	/*                                 calendar:attachFiles                       */
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
					'calendar',
				],
				operation: [
					'attachFiles',
				],
			},
		},
		default: '',
		description: 'The id of the calendar entry.',
	},
	{
		displayName: 'Files',
		name: 'files',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'calendar',
				],
				operation: [
					'attachFiles',
				],
			},
		},
		default: '',
		description: 'The files to upload.', // todo Array of file?
	},

    /* -------------------------------------------------------------------------- */
	/*                                 calendar:removeFiles                       */
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
					'calendar',
				],
				operation: [
					'removeFiles',
				],
			},
		},
		default: '',
		description: 'The id of the calendar entry.',
	},
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'calendar',
				],
				operation: [
					'removeFiles',
				],
			},
		},
		default: '',
		description: 'The id of file to remove.',
	},

    /* -------------------------------------------------------------------------- */
	/*                                 calendar:changeParticipant                 */
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
					'calendar',
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
					'calendar',
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
