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
				name: 'Change Index',
				value: 'changeIndex',
				description: 'Change page index',
			},
            {
				name: 'Move',
				value: 'move',
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
		name: 'wikiPageTitle',
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
		name: 'wikiPageAdditionalFields',
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
		name: 'revisionContent',
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
		displayName: 'Page Edit Form',
		name: 'pageEditForm',
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
				name: 'topicsStr',
				type: 'string',
				default: '',
				description: 'Comma separated list of integers. Example: 1,2',
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
		displayName: 'Wiki Page',
		name: 'wikiPage',
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
		displayName: 'Wiki Page Revision',
		name: 'wikiPageRevision',
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
				displayName: 'Revision Content',
				name: 'revisionContent',
				type: 'string',
				default: '',
				description: 'Wiki page revision content.',
			},
		],
	},
	{
		displayName: 'Page Edit Form',
		name: 'pageEditForm',
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
				name: 'topicsStr',
				type: 'string',
				default: '',
				description: 'Comma separated list of integers. Example: 1,2',
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
	/*                                 wikiPage:changeIndex		                  */
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
					'changeIndex',
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
					'changeIndex',
				],
			},
		},
		default: '',
		description: 'Wiki page target id.',
	},
	{
		displayName: 'Index',
		name: 'index',
		type: 'number',
        typeOptions: {
            numberStepSize: 1,
        },
		displayOptions: {
			show: {
				resource: [
					'wikiPage',
				],
				operation: [
					'changeIndex',
				],
			},
		},
		default: '',
		description: 'Index for order. Default: 0',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 wikiPage:move		                      */
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
					'move',
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
					'move',
				],
			},
		},
		default: '',
		description: 'Guid of target space container.',
	},

] as INodeProperties[];
