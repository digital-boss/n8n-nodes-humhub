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
						}; //todo

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/user/group`,
							body,
						);

					} else if (operation === 'get') {

						// ----------------------------------------
						//             group:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/user/group/${id}`,
						);

					} else if (operation === 'getAllMembers') {

						// ----------------------------------------
						//             group:getAllMembers
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						//todo simplify output
						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/user/group/${id}/member`,
							undefined,
							qs,
						);

					} else if (operation === 'addMember') {

						// ----------------------------------------
						//             group:addMember
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const userId = this.getNodeParameter('userId', i) as number;
						const isManager = this.getNodeParameter('isManager', i) as boolean;
						qs.userId = userId;
						qs.isManager = isManager;

						responseData = await humhubApiRequest.call(
							this,
							'PUT',
							`/user/group/${id}/member`,
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
								`/content/findByContainer/${id}`,
							);
						}
						else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/content/findByContainer/${id}`,
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
							`/content/${id}`,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             content:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/content/${id}`,
						);

					} else if (operation === 'getAllContainers') {

						// ----------------------------------------
						//             content:getAllContainers
						// ----------------------------------------

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/content/container`,
							);
						}
						else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/content/container`,
								undefined,
								qs,
							);
						}
					}

				} else if (resource === 'post') {
					if (operation === 'getAllByContainer') {

						// ----------------------------------------
						//             post:getAllByContainer
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						qs.topics = this.getNodeParameter('topics', i) as string;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/post/container/${id}`,
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

						const body: IDataObject = {
							data: {
								message
							}
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/post/container/${id}`,
							body,
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

						const body: IDataObject = {
							data: {
								message
							}
						};

						responseData = await humhubApiRequest.call(
							this,
							'PUT',
							`/post/${id}`,
							body,
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
				} else if (resource === 'spaceMembership') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             spaceMembership:getAll
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
						//             spaceMembership:create
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
						//             spaceMembership:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const userId = this.getNodeParameter('userId', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/space/${id}/membership/${userId}`,
						);

					} else if (operation === 'update') {

						// ----------------------------------------
						//             spaceMembership:update
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const userId = this.getNodeParameter('userId', i) as number;

						qs.role = this.getNodeParameter('role', i) as string;

						responseData = await humhubApiRequest.call(
							this,
							'PATCH',
							`/space/${id}/membership/${userId}/role`,
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
							'POST',
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
								`/calendar`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/calendar`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'getAllByContainer') {

						// ----------------------------------------
						//             calendar:getAllByContainer
						// ----------------------------------------


						const id = this.getNodeParameter('id', i) as number;

						qs.topics = this.getNodeParameter('topics', i) as string;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/calendar/container/${id}`,
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
								`/calendar/container/${id}`,
								undefined,
								qs,
							);
						}


					} else if (operation === 'deleteAllByContainer') {

						// ----------------------------------------
						//             calendar:deleteAllByContainer
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/calendar/container/${id}`,
						);

					} else if (operation === 'create') {

						// ----------------------------------------
						//             calendar:create
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const calendarEntry = this.getNodeParameter('calendarEntryAdditionalFields', i) as IDataObject;
						calendarEntry.title =  this.getNodeParameter('calendarEntryTitle', i) as string;

						const calendarEntryForm = this.getNodeParameter('calendarEntryFormAdditionalFields', i) as IDataObject;
						calendarEntryForm.start_date = this.getNodeParameter('calendarEntryFormStartDate', i) as string;
						calendarEntryForm.end_date = this.getNodeParameter('calendarEntryFormEndDate', i) as string;

						const body: IDataObject = {
							CalendarEntry: calendarEntry,
							CalendarEntryForm: calendarEntryForm,
						},

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/calendar/container/${id}`,
							body,
						);

					} else if (operation === 'get') {

						// ----------------------------------------
						//             calendar:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/calendar/entry/${id}`,
						);

					} else if (operation === 'update') {

						// ----------------------------------------
						//             calendar:update
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const calendarEntry = this.getNodeParameter('calendarEntry', i) as IDataObject;
						const calendarEntryForm = this.getNodeParameter('calendarEntryForm', i) as IDataObject;

						const body: IDataObject = {
							CalendarEntry: calendarEntry,
							CalendarEntryForm: calendarEntryForm,
						},

						responseData = await humhubApiRequest.call(
							this,
							'PUT',
							`/calendar/entry/${id}`,
							body,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             calendar:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/calendar/entry/${id}`,
						);

					} else if (operation === 'attachFiles') {

						// ----------------------------------------
						//             calendar:attachFiles
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const files = this.getNodeParameter('files', i) as string; //todo array of file

						const body: IDataObject = {
							files,
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`calendar/entry/${id}/upload-files`,
							body,
						);

					} else if (operation === 'removeFile') {

						// ----------------------------------------
						//             calendar:removeFile
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const fileId = this.getNodeParameter('fileId', i) as string;
						qs.id = id;
						qs.fileId = fileId;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`calendar/entry/${id}/remove-file`,
							undefined,
							qs,
						);

					} else if (operation === 'changeParticipant') {

						// ----------------------------------------
						//             calendar:changeParticipant
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const type = this.getNodeParameter('type', i) as number;

						const body: IDataObject = {
							type,
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`calendar/entry/${id}/respond`,
							body,
						);

					}

				} else if (resource === 'cFile') {
					if (operation === 'getAllDirectories') {

						// ----------------------------------------
						//             cFile:getAllDirectories
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/cfiels/folders/container/${id}`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/cfiels/folders/container/${id}`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'createDirectory') {

						// ----------------------------------------
						//             cFile:createDirectory
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const targetId = this.getNodeParameter('targetId', i) as number;

						const title = this.getNodeParameter('title', i) as string;
						const folder: IDataObject = {
							title
						};
						// assign description and visibility
						const folderAdditionalFields = this.getNodeParameter('folderAdditionalFields', i) as IDataObject;
						Object.assign(folder, folderAdditionalFields);

						const body: IDataObject = {
							target_id: targetId,
							Folder: folder,
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
								`/cfiels/folders/container/${id}`,
							body,
						);


					} else if (operation === 'getDirectory') {

						// ----------------------------------------
						//             cFile:getDirectory
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/cfiels/folder/${id}`,
						);

					} else if (operation === 'updateDirectory') {

						// ----------------------------------------
						//             cFile:updateDirectory
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const targetId = this.getNodeParameter('targetId', i) as number;
						const folder = this.getNodeParameter('folder', i) as IDataObject;
						const body: IDataObject = {
							target_id: targetId,
							Folder: folder,
						};

						responseData = await humhubApiRequest.call(
							this,
							'PUT',
							`/cfiels/folder/${id}`,
							body,
						);

					} else if (operation === 'deleteDirectory') {

						// ----------------------------------------
						//             cFile:deleteDirectory
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/cfiels/folder/${id}`,
						);

					} else if (operation === 'getAll') {

						// ----------------------------------------
						//             cFile:getAll
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/cfiels/files/container/${id}`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/cfiels/files/container/${id}`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'upload') {

						// ----------------------------------------
						//             cFile:upload
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const folderId = this.getNodeParameter('folder_id', i) as number;
						const files = this.getNodeParameter('files', i) as string; //todo array of file

						const body: IDataObject = {
							folder_id: folderId,
							files,
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/cfiels/files/container/${id}`,
							body,
						);

					} else if (operation === 'get') {

						// ----------------------------------------
						//             cFile:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/cfiels/file/${id}`,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             cFile:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/cfiels/file/${id}`,
						);

					} else if (operation === 'makePublic') {

						// ----------------------------------------
						//             cFile:makePublic
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const selection = this.getNodeParameter('selection', i) as string;

						const body: IDataObject = {
							selection
						};

						responseData = await humhubApiRequest.call(
							this,
							'PATCH',
							`/cfiels/items/container/${id}/make-public`,
							body,
						);

					} else if (operation === 'makePrivate') {

						// ----------------------------------------
						//             cFile:makePrivate
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const selection = this.getNodeParameter('selection', i) as string;

						const body: IDataObject = {
							selection
						};

						responseData = await humhubApiRequest.call(
							this,
							'PATCH',
							`/cfiels/items/container/${id}/make-private`,
							body,
						);

					} else if (operation === 'moveToFolder') {

						// ----------------------------------------
						//             cFile:moveToFolder
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const sourceId = this.getNodeParameter('source_id', i) as number;
						const destId = this.getNodeParameter('destId', i) as string;
						const selection = this.getNodeParameter('selection', i) as string;

						const body: IDataObject = {
							source_id: sourceId,
							MoveForm: {
								destId,
							},
							selection,
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/cfiels/items/container/${id}/move`,
							body,
						);

					} else if (operation === 'deleteFromFolder') {

						// ----------------------------------------
						//             cFile:deleteFromFolder
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const selection = this.getNodeParameter('selection', i) as string;

						const body: IDataObject = {
							selection,
						};

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/cfiels/items/container/${id}/delete`,
							body,
						);
					}

				} else if (resource === 'task') {
					 if (operation === 'getAll') {

						// ----------------------------------------
						//             task:getAll
						// ----------------------------------------

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/tasks`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/tasks`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'getAllByContainer') {

						// ----------------------------------------
						//             task:getAllByContainer
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/tasks/container/${id}`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/tasks/container/${id}`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'deleteAllByContainer') {

						// ----------------------------------------
						//             task:deleteAllByContainer
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/tasks/container/${id}`,
						);

					} else if (operation === 'create') {

						// ----------------------------------------
						//             task:create
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const title = this.getNodeParameter('taskTitle', i) as string;
						const task: IDataObject = {
							title,
						};
						const taskAdditionalFields = this.getNodeParameter('taskAdditionalFields', i) as IDataObject;
						Object.assign(task, taskAdditionalFields);

						const isPublic = this.getNodeParameter('is_public', i) as string;
						const startDate = this.getNodeParameter('start_date', i) as string;
						const startTime = this.getNodeParameter('start_time', i) as string;
						const endDate = this.getNodeParameter('end_date', i) as string;
						const endTime = this.getNodeParameter('end_time', i) as string;
						const timeZone = this.getNodeParameter('timeZone', i) as string;
						const newItems = this.getNodeParameter('newItems', i) as string;
						const taskForm: IDataObject = {
							is_public: isPublic,
							start_date: startDate,
							start_time: startTime,
							end_date: endDate,
							end_time: endTime,
							timeZone,
							newItems,
						};

						// const startDate = this.getNodeParameter('start_date', i) as string;
						// const endDate = this.getNodeParameter('end_date', i) as string;
						// const taskForm: IDataObject = {
						// 	start_date: startDate,
						// 	end_date: endDate,
						// };
						// const taskFormAdditionalFields = this.getNodeParameter('taskFormAdditionalFields', i) as IDataObject;
						// Object.assign(taskForm, taskFormAdditionalFields);

						const body: IDataObject = {
							Task: task,
							TaskForm: taskForm,
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/tasks/container/${id}`,
							body,
						);

					} else if (operation === 'get') {

						// ----------------------------------------
						//             task:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/tasks/task/${id}`,
						);

					} else if (operation === 'update') {

						// ----------------------------------------
						//             task:update
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const task = this.getNodeParameter('task', i) as IDataObject;
						const taskForm = this.getNodeParameter('taskForm', i) as IDataObject;

						const body: IDataObject = {
							Task: task,
							TaskForm: taskForm,
						};

						responseData = await humhubApiRequest.call(
							this,
							'PUT',
							`/tasks/task/${id}`,
							body,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             task:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/tasks/task/${id}`,
						);

					} else if (operation === 'changeStatus') {

						// ----------------------------------------
						//             task:changeStatus
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const title = this.getNodeParameter('title', i) as number;

						const body: IDataObject = {
							title,
						};

						responseData = await humhubApiRequest.call(
							this,
							'PATCH',
							`/tasks/task/${id}/proceed`,
							body,
						);

					} else if (operation === 'revert') {

						// ----------------------------------------
						//             task:revert
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const title = this.getNodeParameter('title', i) as number;

						const body: IDataObject = {
							title,
						};

						responseData = await humhubApiRequest.call(
							this,
							'PATCH',
							`/tasks/task/${id}/revert`,
							body,
						);

					} else if (operation === 'attachFiles') {

						// ----------------------------------------
						//             task:attachFiles
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const files = this.getNodeParameter('files', i) as string; //todo array of file

						const body: IDataObject = {
							files,
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/tasks/task/${id}/upload-files`,
							body,
						);

					} else if (operation === 'removeFile') {

						// ----------------------------------------
						//             task:removeFile
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const fileId = this.getNodeParameter('fileId', i) as string;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/tasks/task/${id}/remove-file/${fileId}`,
						);
					}

				} else if (resource === 'taskList') {
					 if (operation === 'getAll') {

						// ----------------------------------------
						//             taskList:getAll
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/tasks/lists/container/${id}`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/tasks/lists/container/${id}`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'create') {

						// ----------------------------------------
						//             taskList:create
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const name = this.getNodeParameter('name', i) as string;
						const color = this.getNodeParameter('color', i) as string;
						const hideIfCompleted = this.getNodeParameter('hide_if_completed', i) as number;

						const body: IDataObject = {
							TaskList: {
								name,
								color
							},
							TaskListSettings: {
								hide_if_completed: hideIfCompleted,
							},
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/tasks/lists/container/${id}`,
							body,
						);

					} else if (operation === 'get') {

						// ----------------------------------------
						//             taskList:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/tasks/list/${id}`,
						);

					} else if (operation === 'update') {

						// ----------------------------------------
						//             taskList:update
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const name = this.getNodeParameter('name', i) as string;
						const color = this.getNodeParameter('color', i) as string;
						const hideIfCompleted = this.getNodeParameter('hide_if_completed', i) as number;

						const body: IDataObject = {
							TaskList: {
								name,
								color
							},
							TaskListSettings: {
								hide_if_completed: hideIfCompleted,
							},
						};

						responseData = await humhubApiRequest.call(
							this,
							'PUT',
							`/tasks/list/${id}`,
							body,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             taskList:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/tasks/list/${id}`,
						);
					}

				} else if (resource === 'wikiPage') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             wikiPage:getAll
						// ----------------------------------------

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/wiki`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/wiki`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'getAllByContainer') {

						// ----------------------------------------
						//             wikiPage:getAllByContainer
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;
						const topics = this.getNodeParameter('topics', i) as string;
						qs.topics = topics;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/wiki/container/${id}`,
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
								`/wiki/container/${id}`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'deleteByContainer') {

						// ----------------------------------------
						//             wikiPage:deleteByContainer
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/wiki/container/${id}`,
						);

					} else if (operation === 'create') {

						// ----------------------------------------
						//             wikiPage:create
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const wikiPageTitle = this.getNodeParameter('wikiPageTitle', i) as string;
						const wikiPage: IDataObject = {
							title: wikiPageTitle,
						};
						const wikiPageAdditionalFields = this.getNodeParameter('wikiPageAdditionalFields', i) as IDataObject;
						Object.assign(wikiPage, wikiPageAdditionalFields);

						const revisionContent = this.getNodeParameter('revisionContent', i) as string;

						const pageEditForm = this.getNodeParameter('pageEditForm', i) as IDataObject; //todo array of integers

						const body: IDataObject = {
							WikiPage: wikiPage,
							WikiPageRevision: {
								content: revisionContent,
							},
							PageEditForm: pageEditForm,
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/wiki/container/${id}`,
							body,
						);

					} else if (operation === 'get') {

						// ----------------------------------------
						//             wikiPage:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/wiki/page/${id}`,
						);

					} else if (operation === 'update') {

						// ----------------------------------------
						//             wikiPage:update
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const wikiPage = this.getNodeParameter('wikiPage', i) as IDataObject;
						const wikiPageRevision = this.getNodeParameter('wikiPageRevision', i) as IDataObject;
						const pageEditForm = this.getNodeParameter('pageEditForm', i) as IDataObject; //todo array of integers

						const body: IDataObject = {
							WikiPage: wikiPage,
							WikiPageRevision: wikiPageRevision,
							PageEditForm: pageEditForm,
						};

						responseData = await humhubApiRequest.call(
							this,
							'PUT',
							`/wiki/page/${id}`,
							body,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             wikiPage:delete
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/wiki/page/${id}`,
						);

					} else if (operation === 'moveToCategory') {

						// ----------------------------------------
						//             wikiPage:moveToCategory
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const targetId = this.getNodeParameter('target_id', i) as number;
						const index = this.getNodeParameter('index', i) as number;

						const body: IDataObject = {
							target_id: targetId,
							index,
						};

						responseData = await humhubApiRequest.call(
							this,
							'PATCH',
							`/wiki/page/${id}/change-index`,
							body,
						);

					} else if (operation === 'moveToSpace') {

						// ----------------------------------------
						//             wikiPage:moveToSpace
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						const target = this.getNodeParameter('target', i) as string;

						const body: IDataObject = {
							target,
						};

						responseData = await humhubApiRequest.call(
							this,
							'PATCH',
							`/wiki/page/${id}/move`,
							body,
						);

					}

				} else if (resource === 'wikiPageRevision') {
					 if (operation === 'getAll') {

						// ----------------------------------------
						//             wikiPageRevision:getAll
						// ----------------------------------------

						const pageId = this.getNodeParameter('pageId', i) as number;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/wiki/page/${pageId}/revisions`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/wiki/page/${pageId}/revisions`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'get') {

						// ----------------------------------------
						//             wikiPageRevision:get
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/wiki/revision/${id}`,
						);

					} else if (operation === 'revert') {

						// ----------------------------------------
						//             wikiPageRevision:revert
						// ----------------------------------------

						const id = this.getNodeParameter('id', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'PATCH',
							`/wiki/revision/${id}/revert`,
						);
					}

				} else if (resource === 'mailConversation') {
					 if (operation === 'getAll') {

						// ----------------------------------------
						//             mailConversation:getAll
						// ----------------------------------------

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/mail`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/mail`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'create') {

						// ----------------------------------------
						//             mailConversation:create
						// ----------------------------------------

						 const title = this.getNodeParameter('title', i) as string;
						 const message = this.getNodeParameter('message', i) as string;

						 const recipientStr = this.getNodeParameter('recipient', i) as string;
						 const recipient = recipientStr.split(',');

						 const body: IDataObject = {
							title,
							message,
							recipient,
						 };

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/mail`,
							body,
						);

					} else if (operation === 'get') {

						// ----------------------------------------
						//             mailConversation:get
						// ----------------------------------------

						const messageId = this.getNodeParameter('messageId', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/mail/${messageId}`,
						);
					}

				} else if (resource === 'mailEntry') {
					 if (operation === 'getAll') {

						// ----------------------------------------
						//             mailEntry:getAll
						// ----------------------------------------

						const messageId = this.getNodeParameter('messageId', i) as number;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/mail/${messageId}/entries`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/mail/${messageId}/entries`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'create') {

						// ----------------------------------------
						//             mailEntry:create
						// ----------------------------------------

						const messageId = this.getNodeParameter('messageId', i) as number;

						const message = this.getNodeParameter('message', i) as string;

						const body: IDataObject = {
							message,
						};

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/mail/${messageId}/entry`,
							body,
						);

					} else if (operation === 'get') {

						// ----------------------------------------
						//             mailEntry:get
						// ----------------------------------------

						const messageId = this.getNodeParameter('messageId', i) as number;
						const entryId = this.getNodeParameter('entryId', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'GET',
							`/mail/${messageId}/entry/${entryId}`,
						);

					} else if (operation === 'update') {

						// ----------------------------------------
						//             mailEntry:update
						// ----------------------------------------

						const messageId = this.getNodeParameter('messageId', i) as number;
						const entryId = this.getNodeParameter('entryId', i) as number;

						const content = this.getNodeParameter('content', i) as string;

						const body: IDataObject = {
							content,
						};

						responseData = await humhubApiRequest.call(
							this,
							'PUT',
							`/mail/${messageId}/entry/${entryId}`,
							body,
						);

					} else if (operation === 'delete') {

						// ----------------------------------------
						//             mailEntry:delete
						// ----------------------------------------

						const messageId = this.getNodeParameter('messageId', i) as number;
						const entryId = this.getNodeParameter('entryId', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/mail/${messageId}/entry/${entryId}`,
						);
					}

				} else if (resource === 'mailRecipient') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             mailRecipient:getAll
						// ----------------------------------------

						const messageId = this.getNodeParameter('messageId', i) as number;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/mail/${messageId}/users`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/mail/${messageId}/users`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'add') {

						// ----------------------------------------
						//             mailRecipient:add
						// ----------------------------------------

						const messageId = this.getNodeParameter('messageId', i) as number;
						const userId = this.getNodeParameter('userId', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'POST',
							`/mail/${messageId}/user/${userId}`,
						);

					} else if (operation === 'remove') {

						// ----------------------------------------
						//             mailRecipient:remove
						// ----------------------------------------

						const messageId = this.getNodeParameter('messageId', i) as number;
						const userId = this.getNodeParameter('userId', i) as number;

						responseData = await humhubApiRequest.call(
							this,
							'DELETE',
							`/mail/${messageId}/user/${userId}`,
						);
					}

				} else if (resource === 'mailTag') {
					if (operation === 'getAll') {

						// ----------------------------------------
						//             mailTag:getAll
						// ----------------------------------------

						const messageId = this.getNodeParameter('messageId', i) as number;

						const returnAll = this.getNodeParameter('returnAll', 0) as IDataObject;
						if (returnAll) {
							responseData = await humhubApiRequestAllItems.call(
								this,
								'results',
								'GET',
								`/mail/${messageId}/tags`,
							);
						} else {
							// get additional fields input for limit and page
							const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
							Object.assign(qs, additionalFields);

							responseData = await humhubApiRequest.call(
								this,
								'GET',
								`/mail/${messageId}/tags`,
								undefined,
								qs,
							);
						}

					} else if (operation === 'update') {

						// ----------------------------------------
						//             mailTag:update
						// ----------------------------------------

						const messageId = this.getNodeParameter('messageId', i) as number;
						
						const tagsStr = this.getNodeParameter('tags', i) as string;
						 const tags = tagsStr.split(',');

						const body: IDataObject = {
							tags,
						};

						responseData = await humhubApiRequest.call(
							this,
							'PUT',
							`/mail/${messageId}/tags`,
							body,
						);
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
