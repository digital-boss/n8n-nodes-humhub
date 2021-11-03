import {
	INodeProperties,
} from 'n8n-workflow';

import {
	getPagingParameters
} from '../GenericFunctions';

export const wikiPageOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'wikiPage',
				],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Find all wiki pages',
			},
			{
				name: 'Get All By Container',
				value: 'getAllByContainer',
				description: 'Find all wiki pages by container',
			},
			{
				name: 'Delete By Container',
				value: 'deleteByContainer',
				description: 'Delete a wiki page by container',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new wiki page',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get wiki page by id',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update wiki page by id',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a wiki page by id',
			},
            {
				name: 'Move To Category',
				value: 'moveToCategory',
				description: 'Move page to another category',
			},
            {
				name: 'Move To Space',
				value: 'moveToSpace',
				description: 'Move page to another space',
			},
		],
		default: 'getAll',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const  wikiPageFields = [

	/* -------------------------------------------------------------------------- */
	/*                                 wikiPage:getAll                            */
	/* -------------------------------------------------------------------------- */

    ...getPagingParameters('wikiPage'),

	/* -------------------------------------------------------------------------- */
	/*                                 wikiPage:getAllByContainer                 */
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
					'wikiPage',
				],
				operation: [
					'getAllByContainer',
				],
			},
		},
		default: '',
		description: 'ID of content container.',
	},
	{
		displayName: 'Topics',
		name: 'topics',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'wikiPage',
				],
				operation: [
					'getAllByContainer',
				],
			},
		},
		default: '',
		description: 'Comma separated list of topics to filter. Example: Music,Dancing',
	},
    ...getPagingParameters('wikiPage', 'getAllByContainer'),

	/* -------------------------------------------------------------------------- */
	/*                                 wikiPage:deleteByContainer                 */
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
					'wikiPage',
				],
				operation: [
					'deleteByContainer',
				],
			},
		},
		default: '',
		description: 'The id of content container.',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 wikiPage:create                            */
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
					'wikiPage',
				],
				operation: [
					'create',
				],
			},
		},
		default: '',
		description: 'The id of content container.',
	},
    {
		displayName: 'Wiki Page Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'wikiPage',
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
		displayName: 'Wiki Page Additional Fields',
		name: 'WikiPageAdditionalFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: [
					'wikiPage',
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
				displayName: 'Is Home',
				name: 'is_home',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Admin Only',
				name: 'admin_only',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Is Category',
				name: 'is_category',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Parent Page ID',
				name: 'parent_page_id',
				type: 'number',
				default: '',
				description: '',
			},
		],
	},
	{
		displayName: 'Revision Content',
		name: 'content',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'wikiPage',
				],
				operation: [
					'create',
				],
			},
		},
		default: '',
		description: 'Wiki page revision content.',
	},
	{
		displayName: 'Page Edit Form Additional Fields',
		name: 'PageEditFormAdditionalFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: [
					'wikiPage',
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
				displayName: 'Topics',
				name: 'topics',
				type: 'string',
				default: '',
				description: '', // todo Array of integers <int64>
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                 wikiPage:get	                        	  */
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
					'wikiPage',
				],
				operation: [
					'get',
				],
			},
		},
		default: '',
		description: 'The id of the wiki page.',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 wikiPage:update                            */
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
					'wikiPage',
				],
				operation: [
					'update',
				],
			},
		},
		default: '',
		description: 'The id of content container.',
	},
	{
		displayName: 'Wiki Page Additional Fields',
		name: 'WikiPageAdditionalFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: [
					'wikiPage',
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
				displayName: 'Wiki Page Title',
				name: 'title',
				type: 'string',
				default: '',
				description: '',
			},
			{
				displayName: 'Is Home',
				name: 'is_home',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Admin Only',
				name: 'admin_only',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Is Category',
				name: 'is_category',
				type: 'number',
				default: '',
				description: '',
			},
			{
				displayName: 'Parent Page ID',
				name: 'parent_page_id',
				type: 'number',
				default: '',
				description: '',
			},
		],
	},
	{
		displayName: 'Revision Content',
		name: 'content',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'wikiPage',
				],
				operation: [
					'update',
				],
			},
		},
		default: '',
		description: 'Wiki page revision content.',
	},
	{
		displayName: 'Page Edit Form Additional Fields',
		name: 'PageEditFormAdditionalFields',
		type: 'collection',
		displayOptions: {
			show: {
				resource: [
					'wikiPage',
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
				displayName: 'Topics',
				name: 'topics',
				type: 'string',
				default: '',
				description: '', // todo Array of integers <int64>
			},
		],
	},

	/* -------------------------------------------------------------------------- */
	/*                                 wikiPage:delete                            */
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
					'wikiPage',
				],
				operation: [
					'delete',
				],
			},
		},
		default: '',
		description: 'The id of the wiki page.',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 wikiPage:moveToCategory                    */
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
					'wikiPage',
				],
				operation: [
					'moveToCategory',
				],
			},
		},
		default: '',
		description: 'The id of the wiki page.',
	},
	{
		displayName: 'Target ID',
		name: 'target_id',
		type: 'number',
		required: true,
        typeOptions: {
            numberStepSize: 1,
        },
		displayOptions: {
			show: {
				resource: [
					'wikiPage',
				],
				operation: [
					'moveToCategory',
				],
			},
		},
		default: '',
		description: 'Wiki page category id.',
	},
	{
		displayName: 'Index',
		name: 'index',
		type: 'number',
		required: true,
        typeOptions: {
            numberStepSize: 1,
        },
		displayOptions: {
			show: {
				resource: [
					'wikiPage',
				],
				operation: [
					'moveToCategory',
				],
			},
		},
		default: '',
		description: 'Index for order. Default: 0',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 wikiPage:moveToSpace                       */
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
					'wikiPage',
				],
				operation: [
					'moveToSpace',
				],
			},
		},
		default: '',
		description: 'The id of the wiki page.',
	},
	{
		displayName: 'Target',
		name: 'target',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'wikiPage',
				],
				operation: [
					'moveToSpace',
				],
			},
		},
		default: '',
		description: 'Guid of target space container.',
	},

] as INodeProperties[];
