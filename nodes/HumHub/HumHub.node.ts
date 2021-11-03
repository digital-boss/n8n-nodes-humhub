import {
	IExecuteFunctions
} from 'n8n-core';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeOperationError,
} from 'n8n-workflow';

import {
	humhubApiRequest,
	humhubApiRequestAllItems,
	validateJSON,
} from './GenericFunctions';

import {
	activityFields,
	activityOperations,
	commentFields,
	commentOperations,
	contentFields,
	contentOperations,
	fileFields,
	fileOperations,
	groupFields,
	groupOperations,
	likeFields,
	likeOperations,
	notificationFields,
	notificationOperations,
	postFields,
	postOperations,
	sessionFields,
	sessionOperations,
	spaceFields,
	spaceOperations,
	spaceMembershipFields,
	spaceMembershipOperations,
	userFields,
	userOperations,
	topicFields,
	topicOperations,
	wikiPageOperations,
	wikiPageRevisionOperations,
	wikiPageFields,
	wikiPageRevisionFields,
	calendarFields,
	calendarOperations,
	cFileOperations,
	cFileFields,
	taskOperations,
	taskFields,
	taskListOperations,
	taskListFields,
	mailConversationOperations,
	mailConversationFields,
	mailEntryOperations,
	mailEntryFields,
	mailRecipientOperations,
	mailRecipientFields,
	mailTagOperations,
	mailTagFields,
} from './descriptions';

export class HumHub implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HumHub',
		name: 'humhub',
		icon: 'file:humhub.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume HumHub API',
		defaults: {
			name: 'HumHub',
			color: '#61c2d0',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'humhubApi',
				required: true,
				// displayOptions: {
				// 	show: {
				// 		authentication: [
				// 			'credentials',
				// 		],
				// 	},
				// },
			},
			// {
			// 	name: 'humhubJwtApi',
			// 	required: true,
			// 	displayOptions: {
			// 		show: {
			// 			authentication: [
			// 				'jwtToken',
			// 			],
			// 		},
			// 	},
			// },
			// {
			// 	name: 'humhubBasicAuthApi',
			// 	required: true,
			// 	displayOptions: {
			// 		show: {
			// 			authentication: [
			// 				'basicAuth',
			// 			],
			// 		},
			// 	},
			// },
		],
		properties: [
			// {
			// 	displayName: 'Authentication',
			// 	name: 'authentication',
			// 	type: 'options',
			// 	options: [
			// 		{
			// 			name: 'Credentials',
			// 			value: 'credentials',
			// 		},
			// 		{
			// 			name: 'JWT Token',
			// 			value: 'jwtToken',
			// 		},
			// 		{
			// 			name: 'Basic Auth',
			// 			value: 'basicAuth',
			// 		},
			// 	],
			// 	default: 'credentials',
			// },
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Session',
						value: 'session',
					},
					{
						name: 'Content',
						value: 'content',
					},
					{
						name: 'Post',
						value: 'post',
					},
					{
						name: 'Comment',
						value: 'comment',
					},
					{
						name: 'Like',
						value: 'like',
					},
					{
						name: 'Activity',
						value: 'activity',
					},
					{
						name: 'File',
						value: 'file',
					},
					{
						name: 'Notification',
						value: 'notification',
					},
					{
						name: 'Space',
						value: 'space',
					},
					{
						name: 'Space Membership',
						value: 'spaceMembership',
					},
					{
						name: 'Topic',
						value: 'topic',
					},

					{
						name: 'Calendar',
						value: 'calendar',
					},
					{
						name: 'CFile',
						value: 'cFile',
					},
					{
						name: 'Task',
						value: 'task',
					},
					{
						name: 'Task List',
						value: 'taskList',
					},
					{
						name: 'Wiki Page',
						value: 'wikiPage',
					},
					{
						name: 'Wiki Page Revision',
						value: 'wikiPageRevision',
					},
					{
						name: 'Mail Conversation',
						value: 'mailConversation',
					},
					{
						name: 'Mail Entry',
						value: 'mailEntry',
					},
					{
						name: 'Mail Recipient',
						value: 'mailRecipient',
					},
					{
						name: 'Mail Tag',
						value: 'mailTag',
					},
				],
				default: 'user',
				description: 'The resource to operate on.',
			},
			...userOperations,
			...userFields,
			...groupOperations,
			...groupFields,
			...sessionOperations,
			...sessionFields,
			...contentOperations,
			...contentFields,
			...postOperations,
			...postFields,
			...commentOperations,
			...commentFields,
			...likeOperations,
			...likeFields,
			...activityOperations,
			...activityFields,
			...fileOperations,
			...fileFields,
			...notificationOperations,
			...notificationFields,
			...spaceOperations,
			...spaceFields,
			...spaceMembershipOperations,
			...spaceMembershipFields,
			...topicOperations,
			...topicFields,

			...calendarOperations,
			...calendarFields,
			...cFileOperations,
			...cFileFields,
			...taskOperations,
			...taskFields,
			...taskListOperations,
			...taskListFields,
			...wikiPageOperations,
			...wikiPageFields,
			...wikiPageRevisionOperations,
			...wikiPageRevisionFields,
			...mailConversationOperations,
			...mailConversationFields,
			...mailEntryOperations,
			...mailEntryFields,
			...mailRecipientOperations,
			...mailRecipientFields,
			...mailTagOperations,
			...mailTagFields,
		]
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const length = (items.length as unknown) as number;
		const qs: IDataObject = {};
		let responseData;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		for (let i = 0; i < length; i++) {
			try {
				if (resource === 'user') {
					if (operation === 'getAll') {
						// ----------------------------------------
						//             user:getAll
						// ----------------------------------------

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/user`,
							);
						}
						else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/user`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'create') {

						// ----------------------------------------
						//             user:create
						// ----------------------------------------

						const username = this.getNodeParameter('username', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						const status = this.getNodeParameter('status', i) as number;
						const contentContainerId = this.getNodeParameter('contentcontainer_id', i) as number;

						const jsonParameterProfile = this.getNodeParameter('jsonParameterProfile', i) as boolean;
						let profile: IDataObject = {};
						if (jsonParameterProfile) {
							const jsonStr = this.getNodeParameter('profileJson', i) as string;

							if (validateJSON(jsonStr) === undefined) {
								throw new NodeOperationError(this.getNode(), 'Profile (JSON) must be a valid json');
							}
							profile = JSON.parse(jsonStr) as IDataObject; // todo: IProfile
						} else {
							profile = this.getNodeParameter('profileUi', i) as IDataObject; //todo as IProfile
						}

						const newPassword = this.getNodeParameter('password', i) as string;

						const body: IDataObject = {
							account: {
								username,
								email,
								status,
								contentcontainer_id: contentContainerId,
							},
							profile,
							password: {
								newPassword,
							},
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/user`,
							body,
						);

					} else if (operation === 'getByUsername') {

						// ----------------------------------------
						//             user:getByUsername
						// ----------------------------------------

						qs.username = this.getNodeParameter('username', i) as string;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/user/get-by-username`,
							undefined,
							qs,
						);

					} else if (operation === 'getByEmail') {

						// ----------------------------------------
						//             user:getByEmail
						// ----------------------------------------

						qs.email = this.getNodeParameter('email', i) as string;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/user/get-by-email`,
							undefined,
							qs,
						);

					} else if (operation === 'getById') {

						// ----------------------------------------
						//             user:getById
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/user/${id}`,
							undefined,
						);

					} else if (operation === 'update') {

						// ----------------------------------------
						//             user:update
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const account = this.getNodeParameter('account', i) as IDataObject;

						const jsonParameterProfile = this.getNodeParameter('jsonParameterProfile', i) as boolean;
						let profile: IDataObject = {};
						if (jsonParameterProfile) {
							const jsonStr = this.getNodeParameter('profileJson', i) as string;

							if (validateJSON(jsonStr) === undefined) {
								throw new NodeOperationError(this.getNode(), 'Profile (JSON) must be a valid json');
							}
							profile = JSON.parse(jsonStr) as IDataObject; // todo: IProfile
						} else {
							profile = this.getNodeParameter('profileUi', i) as IDataObject; //todo as IProfile
						}
						const password = this.getNodeParameter('password', i) as IDataObject;

						const body: IDataObject = {
							account,
							profile,
							password,
						};

						responseData = await humhubApiRequest.call(
							this,
							'PUT',
							`/user/${id}`,
							body,
						);

					} else if (operation === 'softDelete') {

						// ----------------------------------------
						//             user:softDelete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/user/${id}`,
						);

					} else if (operation === 'hardDelete') {

						// ----------------------------------------
						//             user:hardDelete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/user/full/${id}`,
						);

					} else if (operation === 'getCurrent') {

						// ----------------------------------------
						//             user:getCurrent
						// ----------------------------------------

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/auth/current`,
						);
					}

				} else if (resource === 'group') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             group:getAll
						// ----------------------------------------

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/user/group`,
							);
						}
						else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/user/group`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'create') {

						// ----------------------------------------
						//             group:create
						// ----------------------------------------

						const name = this.getNodeParameter('name', i) as string;
						const description = this.getNodeParameter('description', i) as string;
						const showAtDirectory = this.getNodeParameter('show_at_directory', i) as boolean;
						const showAtRegistration = this.getNodeParameter('show_at_registration', i) as boolean;
						const sortOrder = this.getNodeParameter('sort_order', i) as number;

						const body: IDataObject = {
							name,
							description,
							show_at_directory: showAtDirectory,
							show_at_registration: showAtRegistration,
							sort_order: sortOrder,
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/user/group`,
							body,
						);

					} else if (operation === 'getAllMembers') {

						// ----------------------------------------
						//             group:getAllMembers
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						//todo can paging fields be passed?
						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'spaces',
								'GET',
								`/user/group/${id}`,
								undefined,
								qs,
							);
						}
						else {
							// get additional fields input for pageSize and pageToken
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/user/group/${id}`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'addMember') {

						// ----------------------------------------
						//             group:addMember
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const userId = this.getNodeParameter('userId', i) as string;
						const isManager = this.getNodeParameter('isManager', i) as boolean;
						qs.userId = userId;
						qs.isManager = isManager;

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/user/group/${id}`,
							undefined,
							qs,
						);

					} else if (operation === 'deleteMember') {

						// ----------------------------------------
						//             group:deleteMember
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						qs.userId = this.getNodeParameter('userId', i) as string;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/user/group/${id}`,
							undefined,
							qs,
						);
					}

				} else if (resource === 'session') {
					if (operation === 'delete') {

						// ----------------------------------------
						//             session:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/user/session/all/${id}`,
						);
					}

				} else if (resource === 'content') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             content:getAll
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/v1/content/findByContainer/${id}`,
							);
						}
						else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/v1/content/findByContainer/${id}`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'get') {

						// ----------------------------------------
						//             content:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/v1/content/${id}`,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             content:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/v1/content/${id}`,
						);

					}
				} else if (resource === 'post') {
					if (operation === 'getAllByContainer') {

						// ----------------------------------------
						//             post:getAllByContainer
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						qs.tpics = this.getNodeParameter('topics', i) as string;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/post/container/${id}`,
							);
						}
						else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/post/container/${id}`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'create') {

						// ----------------------------------------
						//             post:create
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const message = this.getNodeParameter('message', i) as IDataObject;
						qs.data = {
							message
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/post/container/${id}`,
							undefined,
							qs,
						);

					} else if (operation === 'getAll') {

						// ----------------------------------------
						//             post:getAll
						// ----------------------------------------

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/post`,
							);
						}
						else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/post`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'get') {

						// ----------------------------------------
						//             post:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/post/${id}`,
						);

					} else if (operation === 'update') {

						// ----------------------------------------
						//             post:update
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const message = this.getNodeParameter('message', i) as IDataObject;
						qs.data = {
							message
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/post/${id}`,
							undefined,
							qs,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             post:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/post/${id}`,
						);
					}

				} else if (resource === 'comment') {
					if (operation === 'get') {

						// ----------------------------------------
						//             comment:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/comment/${id}`,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             comment:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/comment/${id}`,
						);
					}

				} else if (resource === 'like') {
					if (operation === 'get') {

						// ----------------------------------------
						//             like:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/like/${id}`,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             like:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/like/${id}`,
						);

					} else if (operation === 'getAll') {

						// ----------------------------------------
						//             like:getAll
						// ----------------------------------------


						const model = this.getNodeParameter('model', i) as string;
						const pk = this.getNodeParameter('pk', i) as number;
						qs.model = model;
						qs.pk = pk;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/like/findByRecord`,
								undefined,
								qs,
							);
						}
						else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/like/findByRecord`,
								undefined,
								qs,
							);
						}

					}
				} else if (resource === 'activity') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             activity:getAll
						// ----------------------------------------

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/activity`,
							);
						}
						else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/activity`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'get') {

						// ----------------------------------------
						//             activity:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/activity/${id}`,
						);

					} else if (operation === 'getAllByContainer') {

						// ----------------------------------------
						//             activity:getAllByContainer
						// ----------------------------------------

						const containerId = this.getNodeParameter('containerId', i) as number;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/activity/container/${containerId}`,
							);
						}
						else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/activity/container/${containerId}`,
								undefined,
								qs,
							);
						}
					}

				} else if (resource === 'file') {
					if (operation === 'download') {

						// ----------------------------------------
						//             file:download
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/file/download/${id}`,
						);
					}

				} else if (resource === 'notification') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             notification:getAll
						// ----------------------------------------

						qs.excludeFilters = this.getNodeParameter('excludeFilters', i) as string[];

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/notification`,
								undefined,
								qs,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/notification`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'get') {

						// ----------------------------------------
						//             notification:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/notification/${id}`,
							undefined,
							qs,
						);

					} else if (operation === 'getUnseen') {

						// ----------------------------------------
						//             notification:getUnseen
						// ----------------------------------------

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/notification/unseen`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/notification/unseen`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'markAsSeen') {

						// ----------------------------------------
						//             notification:markAsSeen
						// ----------------------------------------

						responseData = await humhubApiRequest.call(
							this,
							'PATCH',
							`/notification/mark-as-seen`,
						);
					}
				} else if (resource === 'space') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             space:getAll
						// ----------------------------------------

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/space`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/space`,
								undefined,
								qs,
							);
						}
					} else if (operation === 'create') {

						// ----------------------------------------
						//             space:create
						// ----------------------------------------

						const name = this.getNodeParameter('name', i) as string;
						const description = this.getNodeParameter('description', i) as string;
						const visibility = this.getNodeParameter('visibility', i) as number;
						const joinPolicy = this.getNodeParameter('join_policy', i) as number;

						const body: IDataObject = {
							name,
							description,
							visibility,
							join_policy: joinPolicy,
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/space`,
							body,
						);
					} else if (operation === 'get') {

						// ----------------------------------------
						//             space:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/space/${id}`,
						);
					} else if (operation === 'update') {

						// ----------------------------------------
						//             space:update
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						let space: IDataObject = {};
						const jsonParameterSpace = this.getNodeParameter('jsonParameterSpace', i) as boolean;
						if (jsonParameterSpace) {
							const jsonStr = this.getNodeParameter('spaceJson', i) as string;

							if (validateJSON(jsonStr) === undefined) {
								throw new NodeOperationError(this.getNode(), 'Profile (JSON) must be a valid json');
							}
							space = JSON.parse(jsonStr) as IDataObject;
						} else {
							space = this.getNodeParameter('spaceUi', i) as IDataObject; //todo: ISpace
						}

						const body: IDataObject = Object.assign(space);

						responseData = await humhubApiRequest.call(
							this,
							'PUT',
							`/space/${id}`,
							body
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             space:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/space/${id}`,
						);
					} else if (operation === 'archive') {

						// ----------------------------------------
						//             space:archive
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'PATCH',
							`/space/${id}/archive`,
						);
					} else if (operation === 'unarchive') {

						// ----------------------------------------
						//             space:unarchive
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'PATCH',
							`/space/${id}/unarchive`,
						);
					}
				} else if (resource === 'membership') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             membership:getAll
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/space/${id}/membership`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/space/${id}/membership`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'create') {

						// ----------------------------------------
						//             membership:create
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const userId = this.getNodeParameter('userId', i) as number;

						qs.silent = this.getNodeParameter('silent', i) as boolean;

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/space/${id}/membership/${userId}`,
							undefined,
							qs,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             membership:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const userId = this.getNodeParameter('userId', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/space/${id}/membership/${userId}`,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             membership:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const userId = this.getNodeParameter('userId', i) as number;

						qs.role = this.getNodeParameter('role', i) as string;

						responseData = await humhubApiRequest.call(
							this,
							'PATCH',
							`/space/${id}/membership/${userId}`,
							undefined,
							qs,
						);
					}
				} else if (resource === 'topic') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             topic:getAll
						// ----------------------------------------

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/topic`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/topic`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'get') {

						// ----------------------------------------
						//             topic:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/topic/${id}`,
						);

					} else if (operation === 'update') {

						// ----------------------------------------
						//             topic:update
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const name = this.getNodeParameter('name', i) as string;

						const body: IDataObject = {
							name,
						};

						responseData = await humhubApiRequest.call(
							this,
							'PUT',
							`/topic/${id}`,
							body,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             topic:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/topic/${id}`,
						);

					} else if (operation === 'getAllByContainer') {

						// ----------------------------------------
						//             topic:getAllByContainer
						// ----------------------------------------

						const containerId = this.getNodeParameter('containerId', i) as number;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/topic/container/${containerId}`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/topic/container/${containerId}`,
								undefined,
								qs,
							);
						}
					} else if (operation === 'create') {

						// ----------------------------------------
						//             topic:create
						// ----------------------------------------

						const containerId = this.getNodeParameter('containerId', i) as number;
						const name = this.getNodeParameter('name', i) as string;

						const body: IDataObject = {
							name,
						};

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/topic/container/${containerId}`,
							body,
						);
					}

				} else if (resource === 'calendar') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             calendar:getAll
						// ----------------------------------------

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/topic`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/topic`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'getAllByContainer') {

						// ----------------------------------------
						//             calendar:getAllByContainer
						// ----------------------------------------


					} else if (operation === 'deleteAllByContainer') {

						// ----------------------------------------
						//             calendar:deleteAllByContainer
						// ----------------------------------------


					} else if (operation === 'create') {

						// ----------------------------------------
						//             calendar:create
						// ----------------------------------------


					} else if (operation === 'get') {

						// ----------------------------------------
						//             calendar:get
						// ----------------------------------------


					} else if (operation === 'update') {

						// ----------------------------------------
						//             calendar:update
						// ----------------------------------------


					} else if (operation === 'delete') {

						// ----------------------------------------
						//             calendar:delete
						// ----------------------------------------


					} else if (operation === 'attachFiles') {

						// ----------------------------------------
						//             calendar:attachFiles
						// ----------------------------------------


					} else if (operation === 'removeFile') {

						// ----------------------------------------
						//             calendar:removeFile
						// ----------------------------------------


					} else if (operation === 'changeParticipant') {

						// ----------------------------------------
						//             calendar:changeParticipant
						// ----------------------------------------


					}

				} else if (resource === 'cFile') {
					if (operation === 'getAllDirectories') {

						// ----------------------------------------
						//             cFile:getAllDirectories
						// ----------------------------------------


					} else if (operation === 'createDirectory') {

						// ----------------------------------------
						//             cFile:createDirectory
						// ----------------------------------------


					} else if (operation === 'getDirectory') {

						// ----------------------------------------
						//             cFile:getDirectory
						// ----------------------------------------


					} else if (operation === 'updateDirectory') {

						// ----------------------------------------
						//             cFile:updateDirectory
						// ----------------------------------------


					} else if (operation === 'deleteDirectory') {

						// ----------------------------------------
						//             cFile:deleteDirectory
						// ----------------------------------------


					} else if (operation === 'getAll') {

						// ----------------------------------------
						//             cFile:getAll
						// ----------------------------------------


					} else if (operation === 'upload') {

						// ----------------------------------------
						//             cFile:upload
						// ----------------------------------------


					} else if (operation === 'get') {

						// ----------------------------------------
						//             cFile:get
						// ----------------------------------------


					} else if (operation === 'delete') {

						// ----------------------------------------
						//             cFile:delete
						// ----------------------------------------


					} else if (operation === 'makePublic') {

						// ----------------------------------------
						//             cFile:makePublic
						// ----------------------------------------


					} else if (operation === 'makePrivate') {

						// ----------------------------------------
						//             cFile:makePrivate
						// ----------------------------------------


					} else if (operation === 'moveToFolder') {

						// ----------------------------------------
						//             cFile:moveToFolder
						// ----------------------------------------


					} else if (operation === 'deleteFromFolder') {

						// ----------------------------------------
						//             cFile:deleteFromFolder
						// ----------------------------------------


					}

				} else if (resource === 'task') {
					 if (operation === 'getAll') {

						// ----------------------------------------
						//             task:getAll
						// ----------------------------------------


					} else if (operation === 'getAllByContainer') {

						// ----------------------------------------
						//             task:getAllByContainer
						// ----------------------------------------


					} else if (operation === 'deleteAllByContainer') {

						// ----------------------------------------
						//             task:deleteAllByContainer
						// ----------------------------------------


					} else if (operation === 'create') {

						// ----------------------------------------
						//             task:create
						// ----------------------------------------


					} else if (operation === 'get') {

						// ----------------------------------------
						//             task:get
						// ----------------------------------------


					} else if (operation === 'update') {

						// ----------------------------------------
						//             task:update
						// ----------------------------------------


					} else if (operation === 'delete') {

						// ----------------------------------------
						//             task:delete
						// ----------------------------------------


					} else if (operation === 'changeStatus') {

						// ----------------------------------------
						//             task:changeStatus
						// ----------------------------------------


					} else if (operation === 'revert') {

						// ----------------------------------------
						//             task:revert
						// ----------------------------------------


					} else if (operation === 'attachFiles') {

						// ----------------------------------------
						//             task:attachFiles
						// ----------------------------------------


					} else if (operation === 'removeFile') {

						// ----------------------------------------
						//             task:removeFile
						// ----------------------------------------


					}

				} else if (resource === 'taskList') {
					 if (operation === 'getAll') {

						// ----------------------------------------
						//             taskList:getAll
						// ----------------------------------------


					} else if (operation === 'create') {

						// ----------------------------------------
						//             taskList:create
						// ----------------------------------------


					} else if (operation === 'get') {

						// ----------------------------------------
						//             taskList:get
						// ----------------------------------------


					} else if (operation === 'update') {

						// ----------------------------------------
						//             taskList:update
						// ----------------------------------------


					} else if (operation === 'delete') {

						// ----------------------------------------
						//             taskList:delete
						// ----------------------------------------


					}

				} else if (resource === 'wikiPage') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             wikiPage:getAll
						// ----------------------------------------


					} else if (operation === 'getAllByContainer') {

						// ----------------------------------------
						//             wikiPage:getAllByContainer
						// ----------------------------------------


					} else if (operation === 'deleteByContainer') {

						// ----------------------------------------
						//             wikiPage:deleteByContainer
						// ----------------------------------------


					} else if (operation === 'create') {

						// ----------------------------------------
						//             wikiPage:create
						// ----------------------------------------


					} else if (operation === 'get') {

						// ----------------------------------------
						//             wikiPage:get
						// ----------------------------------------


					} else if (operation === 'update') {

						// ----------------------------------------
						//             wikiPage:update
						// ----------------------------------------


					} else if (operation === 'delete') {

						// ----------------------------------------
						//             wikiPage:delete
						// ----------------------------------------


					} else if (operation === 'moveToCategory') {

						// ----------------------------------------
						//             wikiPage:moveToCategory
						// ----------------------------------------


					} else if (operation === 'moveToSpace') {

						// ----------------------------------------
						//             wikiPage:moveToSpace
						// ----------------------------------------


					}

				} else if (resource === 'wikiPageRevision') {
					 if (operation === 'getAll') {

						// ----------------------------------------
						//             wikiPageRevision:getAll
						// ----------------------------------------


					} else if (operation === 'get') {

						// ----------------------------------------
						//             wikiPageRevision:get
						// ----------------------------------------


					} else if (operation === 'revert') {

						// ----------------------------------------
						//             wikiPageRevision:revert
						// ----------------------------------------


					}

				} else if (resource === 'mailConversation') {
					 if (operation === 'getAll') {

						// ----------------------------------------
						//             mailConversation:getAll
						// ----------------------------------------


					} else if (operation === 'create') {

						// ----------------------------------------
						//             mailConversation:create
						// ----------------------------------------


					} else if (operation === 'get') {

						// ----------------------------------------
						//             mailConversation:get
						// ----------------------------------------


					}

				} else if (resource === 'mailEntry') {
					 if (operation === 'getAll') {

						// ----------------------------------------
						//             mailEntry:getAll
						// ----------------------------------------


					} else if (operation === 'create') {

						// ----------------------------------------
						//             mailEntry:create
						// ----------------------------------------


					} else if (operation === 'get') {

						// ----------------------------------------
						//             mailEntry:get
						// ----------------------------------------


					} else if (operation === 'update') {

						// ----------------------------------------
						//             mailEntry:update
						// ----------------------------------------


					} else if (operation === 'delete') {

						// ----------------------------------------
						//             mailEntry:delete
						// ----------------------------------------


					}

				} else if (resource === 'mailRecipient') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             mailRecipient:getAll
						// ----------------------------------------


					} else if (operation === 'add') {

						// ----------------------------------------
						//             mailRecipient:add
						// ----------------------------------------


					} else if (operation === 'remove') {

						// ----------------------------------------
						//             mailRecipient:remove
						// ----------------------------------------


					}

				} else if (resource === 'mailTag') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             mailTag:getAll
						// ----------------------------------------


					} else if (operation === 'update') {

						// ----------------------------------------
						//             mailTag:update
						// ----------------------------------------


					}

				}

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else if (responseData !== undefined) {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					// Return the actual reason as error
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
