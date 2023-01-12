import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HumHubBasicAuthApi implements ICredentialType {
	name = 'humhubBasicAuthApi';
	displayName = 'HumHub Basic Auth API';
	properties: INodeProperties[] = [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			required: true,
			default: '',
			description: 'Your username or email address.',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			required: true,
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Your password.',
		},
		{
			displayName: 'HumHub URL',
			name: 'url',
			type: 'string',
			default: '',
			placeholder: 'https://example.humhub.com',
		},
		{
			displayName: 'Testing Mode',
			name: 'testingMode',
			type: 'boolean',
			default: false,
		},
	];
}
