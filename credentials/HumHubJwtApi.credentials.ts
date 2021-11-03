import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HumHubJwtApi implements ICredentialType {
	name = 'humhubJwtApi';
	displayName = 'HumHub JWT Api';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			default: '',
		},
		{
			displayName: 'HumHub URL',
			name: 'url',
			type: 'string',
			default: '',
			placeholder: 'https://example.humhub.com',
		},
	];
}
