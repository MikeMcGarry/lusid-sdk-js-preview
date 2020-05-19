/**
 * LUSID API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.10.1387
 * Contact: info@finbourne.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import localVarRequest = require('request');
import http = require('http');

/* tslint:disable:no-unused-locals */
import { AnnulStructuredDataResponse } from '../model/annulStructuredDataResponse';
import { GetStructuredResultDataResponse } from '../model/getStructuredResultDataResponse';
import { LusidProblemDetails } from '../model/lusidProblemDetails';
import { LusidValidationProblemDetails } from '../model/lusidValidationProblemDetails';
import { StructuredResultDataId } from '../model/structuredResultDataId';
import { UpsertStructuredDataResponse } from '../model/upsertStructuredDataResponse';
import { UpsertStructuredResultDataRequest } from '../model/upsertStructuredResultDataRequest';

import { ObjectSerializer, Authentication, VoidAuth } from '../model/models';
import { OAuth } from '../model/models';

let defaultBasePath = 'http://localhost/api';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

export enum StructuredResultDataApiApiKeys {
}

export class StructuredResultDataApi {
    protected _basePath = defaultBasePath;
    protected defaultHeaders : any = {};
    protected _useQuerystring : boolean = false;

    protected authentications = {
        'default': <Authentication>new VoidAuth(),
        'oauth2': new OAuth(),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }

    set useQuerystring(value: boolean) {
        this._useQuerystring = value;
    }

    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    get basePath() {
        return this._basePath;
    }

    public setDefaultAuthentication(auth: Authentication) {
        this.authentications.default = auth;
    }

    public setApiKey(key: StructuredResultDataApiApiKeys, value: string) {
        (this.authentications as any)[StructuredResultDataApiApiKeys[key]].apiKey = value;
    }

    set accessToken(token: string) {
        this.authentications.oauth2.accessToken = token;
    }

    /**
     * Delete one or more specified structured result data items from a single scope. Each item is identified by a unique id which includes  information about its type as well as the exact effective datetime (to the microsecond) at which it entered the system (became valid).                In the request each market data item must be keyed by a unique correlation id. This id is ephemeral and is not stored by LUSID.  It serves only as a way to easily identify each quote in the response.                The response will return both the collection of successfully deleted market data items, as well as those that failed.  For the failures a reason will be provided explaining why the it could not be deleted.                It is important to always check the failed set for any unsuccessful results.
     * @summary [EXPERIMENTAL] Delete one or more items of structured result data, assuming they are present.
     * @param scope The scope of the structured result data to delete.
     * @param structuredDataIds The structured result data Ids to delete, each keyed by a unique correlation id.
     */
    public async deleteStructuredResultData (scope: string, structuredDataIds: { [key: string]: StructuredResultDataId; }, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: AnnulStructuredDataResponse;  }> {
        const localVarPath = this.basePath + '/api/unitresults/{scope}/$delete'
            .replace('{' + 'scope' + '}', encodeURIComponent(String(scope)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        // verify required parameter 'scope' is not null or undefined
        if (scope === null || scope === undefined) {
            throw new Error('Required parameter scope was null or undefined when calling deleteStructuredResultData.');
        }

        // verify required parameter 'structuredDataIds' is not null or undefined
        if (structuredDataIds === null || structuredDataIds === undefined) {
            throw new Error('Required parameter structuredDataIds was null or undefined when calling deleteStructuredResultData.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(structuredDataIds, "{ [key: string]: StructuredResultDataId; }")
        };

        this.authentications.oauth2.applyToRequest(localVarRequestOptions);

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.IncomingMessage; body: AnnulStructuredDataResponse;  }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    body = ObjectSerializer.deserialize(body, "AnnulStructuredDataResponse");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    } else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    /**
     * Get one or more items of structured result data from a single scope.                Each item can be identified by its time invariant structured result data identifier.                For each id LUSID will return the most recent matched item with respect to the provided (or default) effective datetime.                 An optional maximum age range window can be specified which defines how far back to look back for data from the specified effective datetime.  LUSID will return the most recent item within this window.                In the request each structured result data id must be keyed by a unique correlation id. This id is ephemeral and is not stored by LUSID.  It serves only as a way to easily identify each item in the response.                The response will return three collections. One, the successfully retrieved structured result data. Two, those that had a  valid identifier but could not be found. Three, those that failed because LUSID could not construct a valid identifier from the request.    For the ids that failed to resolve or could not be found a reason will be provided explaining why that is the case.                It is important to always check the failed and not found sets for any unsuccessful results.
     * @summary [EXPERIMENTAL] Get structured result data
     * @param scope The scope of the structured result data to retrieve.
     * @param structuredDataIds The time invariant set of structured data identifiers to retrieve the data for. These need to be               keyed by a unique correlation id allowing the retrieved item to be identified in the response.
     * @param effectiveAt The effective datetime at which to retrieve the structured result data. Defaults to the current LUSID system datetime if not specified.
     * @param asAt The asAt datetime at which to retrieve the structured result data. Defaults to return the latest version if not specified.
     * @param maxAge The duration of the look back window in an ISO8601 time interval format e.g. P1Y2M3DT4H30M (1 year, 2 months, 3 days, 4 hours and 30 minutes).               This is subtracted from the provided effectiveAt datetime to generate a effective datetime window inside which a structured result data item must exist to be retrieved.
     */
    public async getStructuredResultData (scope: string, structuredDataIds: { [key: string]: StructuredResultDataId; }, effectiveAt?: string, asAt?: Date, maxAge?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: GetStructuredResultDataResponse;  }> {
        const localVarPath = this.basePath + '/api/unitresults/{scope}/$get'
            .replace('{' + 'scope' + '}', encodeURIComponent(String(scope)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        // verify required parameter 'scope' is not null or undefined
        if (scope === null || scope === undefined) {
            throw new Error('Required parameter scope was null or undefined when calling getStructuredResultData.');
        }

        // verify required parameter 'structuredDataIds' is not null or undefined
        if (structuredDataIds === null || structuredDataIds === undefined) {
            throw new Error('Required parameter structuredDataIds was null or undefined when calling getStructuredResultData.');
        }

        if (effectiveAt !== undefined) {
            localVarQueryParameters['effectiveAt'] = ObjectSerializer.serialize(effectiveAt, "string");
        }

        if (asAt !== undefined) {
            localVarQueryParameters['asAt'] = ObjectSerializer.serialize(asAt, "Date");
        }

        if (maxAge !== undefined) {
            localVarQueryParameters['maxAge'] = ObjectSerializer.serialize(maxAge, "string");
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(structuredDataIds, "{ [key: string]: StructuredResultDataId; }")
        };

        this.authentications.oauth2.applyToRequest(localVarRequestOptions);

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.IncomingMessage; body: GetStructuredResultDataResponse;  }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    body = ObjectSerializer.deserialize(body, "GetStructuredResultDataResponse");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    } else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
    /**
     * Update or insert one or more structured result data items in a single scope. An item will be updated if it already exists  and inserted if it does not.                In the request each structured result data item must be keyed by a unique correlation id. This id is ephemeral and is not stored by LUSID.  It serves only as a way to easily identify each structured result data in the response.                The response will return both the collection of successfully updated or inserted structured result data, as well as those that failed.  For the failures a reason will be provided explaining why the item could not be updated or inserted.                It is important to always check the failed set for any unsuccessful results.
     * @summary [EXPERIMENTAL] Upsert a set of structured result data items. This creates or updates the data in Lusid.
     * @param scope The scope to use when updating or inserting the structured result data.
     * @param structuredData The set of structured result data items to update or insert keyed by a unique correlation id.
     */
    public async upsertStructuredResultData (scope: string, structuredData: { [key: string]: UpsertStructuredResultDataRequest; }, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: http.IncomingMessage; body: UpsertStructuredDataResponse;  }> {
        const localVarPath = this.basePath + '/api/unitresults/{scope}'
            .replace('{' + 'scope' + '}', encodeURIComponent(String(scope)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

        // verify required parameter 'scope' is not null or undefined
        if (scope === null || scope === undefined) {
            throw new Error('Required parameter scope was null or undefined when calling upsertStructuredResultData.');
        }

        // verify required parameter 'structuredData' is not null or undefined
        if (structuredData === null || structuredData === undefined) {
            throw new Error('Required parameter structuredData was null or undefined when calling upsertStructuredResultData.');
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(structuredData, "{ [key: string]: UpsertStructuredResultDataRequest; }")
        };

        this.authentications.oauth2.applyToRequest(localVarRequestOptions);

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.IncomingMessage; body: UpsertStructuredDataResponse;  }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    body = ObjectSerializer.deserialize(body, "UpsertStructuredDataResponse");
                    if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                        resolve({ response: response, body: body });
                    } else {
                        reject({ response: response, body: body });
                    }
                }
            });
        });
    }
}
