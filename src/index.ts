import { EventEmitter } from 'events';
import * as httpServer from 'http';
import * as httpsServer from 'https';
import * as crypto from 'crypto';
import {
  ICheckRun,
  ICheckSuit,
  ICodeScanningAlert,
  ICommitComment,
  IDeployKey,
  IDeployment,
  IDeploymentStatus,
  IHook,
  IInstallation,
  IIssue,
  IIssueComment,
  IMilestone,
  IOrg,
  IOrgInvitation,
  IOrgMembership,
  IPageBuild,
  IProject,
  IProjectColumn,
  IPullRequest,
  IPullRequestReview,
  IPullRequestReviewComment,
  IRelease,
  IRepo,
  ISecretScanningAlert,
  ISimpleTeam,
  ISimpleUser,
  ITeam,
  IVulnerabilityScanningAlert,
} from './webhookTypes';

export declare interface GitHubHooks {
  /**
    # branch_protection_rule
    * Activity related to a branch protection rule. For more information, see "[About branch protection rules](https://github.com/en/github/administering-a-repository/defining-the-mergeability-of-pull-requests/about-protected-branches#about-branch-protection-rules)."
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be `created`, `edited`, or `deleted`. |
    | rule | object | The branch protection rule. Includes a `name` and all the [branch protection settings](https://github.com/en/github/administering-a-repository/defining-the-mergeability-of-pull-requests/about-protected-branches#about-branch-protection-settings) applied to branches that match the name. Binary settings are boolean. Multi-level configurations are one of `off`, `non_admins`, or `everyone`. Actor and build lists are arrays of strings. |
    | changes | object | If the action was `edited`, the changes to the rule. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'branch_protection_rule',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'edited' | 'deleted';
      rule: object;
      changes: object;
      repository?: IRepo;
      organization?: IOrg;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # check_run
    * Check run activity has occurred. The type of activity is specified in the `action` property of the payload object. For more information, see the "[check runs](https://github.com/en/rest/reference/checks#runs)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be one of:     | | |  `created` - A new check run was created. |
    | | |  `completed` - The `status` of the check run is `completed`. |
    | | |  `rerequested` - Someone requested to re-run your check run from the pull request UI. See "[About status checks](https://github.com/en/articles/about-status-checks#checks)" for more details about the GitHub UI. When you receive a `rerequested` action, you'll need to [create a new check run](https://github.com/en/rest/reference/checks#create-a-check-run). Only the GitHub App that someone requests to re-run the check will receive the `rerequested` payload. |
    | | |  `requested_action` - Someone requested an action your app provides to be taken. Only the GitHub App someone requests to perform an action will receive the `requested_action` payload. To learn more about check runs and requested actions, see "[Check runs and requested actions](https://github.com/en/rest/reference/checks#check-runs-and-requested-actions)." | |
    | check_run | object | The [check_run](https://github.com/en/rest/reference/checks#get-a-check-run). |
    | check_run[status] | string | The current status of the check run. Can be `queued`, `in_progress`, or `completed`. |
    | check_run[conclusion] | string | The result of the completed check run. Can be one of `success`, `failure`, `neutral`, `cancelled`, `timed_out`,  `action_required` or `stale`. This value will be `null` until the check run has `completed`. |
    | check_run[name] | string | The name of the check run. |
    | check_run[check_suite][id] | integer | The id of the check suite that this check run is part of. |
    | check_run[check_suite][pull_requests] | array | An array of pull requests that match this check suite. A pull request matches a check suite if they have the same `head_sha` and `head_branch`. When the check suite's `head_branch` is in a forked repository it will be `null` and the `pull_requests` array will be empty. |
    | check_run[check_suite][deployment] | object | A deployment to a repository environment. This will only be populated if the check run was created by a GitHub Actions workflow job that references an environment. |
    | requested_action | object | The action requested by the user. |
    | requested_action[identifier] | string | The integrator reference of the action requested by the user. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'check_run',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'completed' | 'rerequested' | 'requested_action';
      check_run: ICheckRun;
      requested_action: { identifier: string };
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # check_suite
    * Check suite activity has occurred. The type of activity is specified in the `action` property of the payload object. For more information, see the "[check suites](https://github.com/en/rest/reference/checks#suites)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be:    | | | `completed` - All check runs in a check suite have completed. |
    | | | `requested` - Occurs when new code is pushed to the app's repository. When you receive the `requested` action events, you'll need to [create a new check run](https://github.com/en/rest/reference/checks#create-a-check-run). |
    | | | `rerequested` - Occurs when someone requests to re-run the entire check suite from the pull request UI. When you receive the `rerequested` action events, you'll need to [create a new check run](https://github.com/en/rest/reference/checks#create-a-check-run). See "[About status checks](https://github.com/en/articles/about-status-checks#checks)" for more details about the GitHub UI. | |
    | check_suite | object | The [check_suite](https://github.com/en/rest/reference/checks#suites). |
    | check_suite[head_branch] | string | The head branch name the changes are on. |
    | check_suite[head_sha] | string | The SHA of the most recent commit for this check suite. |
    | check_suite[status] | string | The summary status for all check runs that are part of the check suite. Can be `requested`, `in_progress`, or `completed`. |
    | check_suite[conclusion] | string | The summary conclusion for all check runs that are part of the check suite. Can be one of `success`, `failure`, `neutral`, `cancelled`, `timed_out`,  `action_required` or `stale`. This value will be `null` until the check run has `completed`. |
    | check_suite[url] | string | URL that points to the check suite API resource. |
    | check_suite[pull_requests] | array | An array of pull requests that match this check suite. A pull request matches a check suite if they have the same `head_sha` and `head_branch`. When the check suite's `head_branch` is in a forked repository it will be `null` and the `pull_requests` array will be empty. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'check_suite',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'completed' | 'requested' | 'rerequested';
      check_suite: ICheckSuit;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # code_scanning_alert
    * Activity related to code scanning alerts in a repository. The type of activity is specified in the action property of the payload object. For more information, see "[About code scanning](https://github.com/en/github/finding-security-vulnerabilities-and-errors-in-your-code/about-code-scanning)."
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. This can be one of `created`, `reopened_by_user`, `closed_by_user`, `fixed`, `appeared_in_branch`, or `reopened`. |
    | alert | object | The code scanning alert involved in the event. |
    | ref | string | The Git reference of the code scanning alert. When the action is `reopened_by_user` or `closed_by_user`, the event was triggered by the `sender` and this value will be empty. |
    | commit_oid | string | The commit SHA of the code scanning alert. When the action is `reopened_by_user` or `closed_by_user`, the event was triggered by the `sender` and this value will be empty. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | If the `action` is `reopened_by_user` or `closed_by_user`, the `sender` object will be the user that triggered the event. The `sender` object is `github` for all other actions. |
  */
  on(
    event: 'code_scanning_alert',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'reopened_by_user' | 'closed_by_user' | 'fixed' | 'appeared_in_branch' | 'reopened';
      alert: ICodeScanningAlert;
      ref: string;
      commit_oid: string;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # commit_comment
    * A commit comment is created. The type of activity is specified in the `action` property of the payload object. For more information, see the "[commit comment](https://github.com/en/rest/reference/repos#comments)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be `created`. |
    | comment | object | The [commit comment](https://github.com/en/rest/reference/repos#get-a-commit-comment) resource. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'commit_comment',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created';
      comment: ICommitComment;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # content_reference
    * A new content reference is `created`. A new content reference is created when the body or comment of an issue or pull request includes a URL that matches a configured content reference domain. For more information, see "[Using content attachments](https://github.com/en/apps/using-content-attachments)" to learn more about content references and attachments.
    * 
    [Webhook payload example](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#webhook-payload-example-5)
  */
  on(
    event: 'content_reference',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | string;
      content_reference: {
        id: number;
        node_id: string;
        reference: string;
      };
      repository?: IRepo;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # create
    * A Git branch or tag is created. For more information, see the "[Git data](https://github.com/en/rest/reference/git)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | ref | string | The [`git ref`](https://github.com/en/rest/reference/git#get-a-reference) resource. |
    | ref_type | string | The type of Git ref object created in the repository. Can be either `branch` or `tag`. |
    | master_branch | string | The name of the repository's default branch (usually `main`). |
    | description | string | The repository's current description. |
    | pusher_type | string | The pusher type for the event. Can be either `user` or a deploy key. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'create',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      ref: string;
      ref_type: 'branch' | 'tag';
      master_branch: string;
      description: string;
      pusher_type: 'user' | string;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # delete
    * A Git branch or tag is deleted. For more information, see the "[Git data](https://github.com/en/rest/reference/git)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | ref | string | The [`git ref`](https://github.com/en/rest/reference/git#get-a-reference) resource. |
    | ref_type | string | The type of Git ref oject deleted in the repository. Can be `branch` or `tag`. |
    | pusher_type | string | The pusher type for the event. Can be either `user` or a deploy key. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'delete',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      ref: string;
      ref_type: 'branch' | 'tag';
      pusher_type: 'user' | string;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # deploy_key
    * A deploy key is added or removed from a repository. The type of activity is specified in the `action` property of the payload object. For more information, see the "[Deploy keys](https://github.com/en/rest/reference/repos#keys)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be either `created` or `deleted`. |
    | key | object | The [`deploy key`](https://github.com/en/rest/reference/repos#get-a-deploy-key) resource. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'deploy_key',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'deleted';
      key: IDeployKey;
      repository?: IRepo;
      organization?: IOrg;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # deployment
    * A deployment is created. The type of activity is specified in the `action` property of the payload object. For more information, see the "[deployment](https://github.com/en/rest/reference/repos#list-deployments)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be `created`. |
    | deployment | object | The [deployment](https://github.com/en/rest/reference/repos#list-deployments). |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'deployment',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created';
      deployment: IDeployment;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # deployment_status
    * A deployment is created. The type of activity is specified in the `action` property of the payload object. For more information, see the "[deployment statuses](https://github.com/en/rest/reference/repos#list-deployment-statuses)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be `created`. |
    | deployment_status | object | The [deployment status](https://github.com/en/rest/reference/repos#list-deployment-statuses). |
    | deployment_status["state"] | string | The new state. Can be `pending`, `success`, `failure`, or `error`. |
    | deployment_status["target_url"] | string | The optional link added to the status. |
    | deployment_status["description"] | string | The optional human-readable description added to the status. |
    | deployment | object | The [deployment](https://github.com/en/rest/reference/repos#list-deployments) that this status is associated with. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'deployment_status',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created';
      deployment_status: IDeploymentStatus;
      deployment: IDeployment;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # discussion
    * 
    __Note:__ Webhook events for GitHub Discussions are currently in beta and subject to change.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be `created`, `edited`, `deleted`, `pinned`, `unpinned`, `locked`, `unlocked`, `transferred`, `category_changed`, `answered`, or `unanswered`. |
    | discussion | object | The [`discussion`](https://github.com/en/graphql/guides/using-the-graphql-api-for-discussions#discussion) resource. |
    | repository | object | The [`repository`](https://github.com/en/graphql/reference/objects#repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/graphql/reference/objects#organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'discussion',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action:
        | 'created'
        | 'edited'
        | 'deleted'
        | 'pinned'
        | 'unpinned'
        | 'locked'
        | 'unlocked'
        | 'transferred'
        | 'category_changed'
        | 'answered'
        | 'unanswered';
      discussion: object;
      repository?: IRepo;
      organization?: IOrg;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # discussion_comment
    * 
    __Note:__ Webhook events for GitHub Discussions are currently in beta and subject to change.

    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be `created`, `edited`, or `deleted`. |
    | comment | object | The [`discussion comment`](https://github.com/en/graphql/guides/using-the-graphql-api-for-discussions#discussioncomment) resource. |
    | discussion | object | The [`discussion`](https://github.com/en/graphql/guides/using-the-graphql-api-for-discussions#discussion) resource. |
    | repository | object | The [`repository`](https://github.com/en/graphql/reference/objects#repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/graphql/reference/objects#organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'discussion_comment',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'edited' | 'deleted';
      comment: object;
      discussion: object;
      repository?: IRepo;
      organization?: IOrg;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # fork
    * A user forks a repository. For more information, see the "[forks](https://github.com/en/rest/reference/repos#forks)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | forkee | object | The created [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) resource. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'fork',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      forkee: IRepo;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # github_app_authorization
    * When someone revokes their authorization of a GitHub App, this event occurs. A GitHub App receives this webhook by default and cannot unsubscribe from this event.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be `revoked`. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'github_app_authorization',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'revoked';
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # gollum
    * A wiki page is created or updated. For more information, see the "[About wikis](https://github.com/en/communities/documenting-your-project-with-wikis/about-wikis)".
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | pages | array | The pages that were updated. |
    | pages[][page_name] | string | The name of the page. |
    | pages[][title] | string | The current page title. |
    | pages[][action] | string | The action that was performed on the page. Can be `created` or `edited`. |
    | pages[][sha] | string | The latest commit SHA of the page. |
    | pages[][html_url] | string | Points to the HTML wiki page. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'gollum',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      pages: { page_name: string; title: string; action: 'created' | 'edited'; sha: string; html_url: string }[];
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # installation
    * Activity related to a GitHub App installation. The type of activity is specified in the `action` property of the payload object. For more information, see the "[GitHub App installation](https://github.com/en/rest/reference/apps)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be one of:    | | | `created` - Someone installs a GitHub App. |
    | | | `deleted` - Someone uninstalls a GitHub App |
    | | | `suspend` - Someone suspends a GitHub App installation. |
    | | | `unsuspend` - Someone unsuspends a GitHub App installation. |
    | | | `new_permissions_<wbr>accepted` - Someone accepts new permissions for a GitHub App installation. When a GitHub App owner requests new permissions, the person who installed the GitHub App must accept the new permissions request.  | |
    | repositories | array | An array of repository objects that the installation can access. |
    | installation | object | The GitHub App installation. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'installation',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'deleted' | 'suspend' | 'unsuspend' | 'new_permissions_accepted';
      repositories: IRepo[];
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # installation_repositories
    * Activity related to repositories being added to a GitHub App installation. The type of activity is specified in the `action` property of the payload object. For more information, see the "[GitHub App installation](https://github.com/en/rest/reference/apps)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be either `added` or `removed`. |
    | repository_selection | string | The choice of repositories the installation is on. Can be either `selected` or `all`. |
    | repositories_added | array | An array of repository objects, which were added to the installation. |
    | repositories_removed | array | An array of repository objects, which were removed from the installation. |
    | installation | object | The GitHub App installation. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'installation_repositories',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'added' | 'removed';
      repository_selection: 'selected' | 'all';
      repositories_added: IRepo[];
      repositories_removed: IRepo[];
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # issue_comment
    * Activity related to an issue or pull request comment. The type of activity is specified in the `action` property of the payload object. For more information, see the "[issue comments](https://github.com/en/rest/reference/issues#comments)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed on the comment. Can be one of `created`, `edited`, or `deleted`. |
    | changes | object | The changes to the comment if the action was `edited`. |
    | changes[body][from] | string | The previous version of the body if the action was `edited`. |
    | issue | object | The [issue](https://github.com/en/rest/reference/issues) the comment belongs to. |
    | comment | object | The [comment](https://github.com/en/rest/reference/issues#comments) itself. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'issue_comment',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'edited' | 'deleted';
      changes: { body: { from: string } };
      issue: IIssue;
      comment: IIssueComment;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # issues
    * Activity related to an issue. The type of activity is specified in the `action` property of the payload object. For more information, see the "[issues](https://github.com/en/rest/reference/issues#comments)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be one of `opened`, `edited`, `deleted`, `pinned`, `unpinned`, `closed`, `reopened`, `assigned`, `unassigned`, `labeled`, `unlabeled`, `locked`, `unlocked`,  `transferred`, `milestoned`, or `demilestoned`. |
    | issue | object | The [issue](https://github.com/en/rest/reference/issues) itself. |
    | changes | object | The changes to the issue if the action was `edited`. |
    | changes[title][from] | string | The previous version of the title if the action was `edited`. |
    | changes[body][from] | string | The previous version of the body if the action was `edited`. |
    | assignee | object | The optional user who was assigned or unassigned from the issue. |
    | label | object | The optional label that was added or removed from the issue. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'issues',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action:
        | 'opened'
        | 'edited'
        | 'deleted'
        | 'pinned'
        | 'unpinned'
        | 'closed'
        | 'reopened'
        | 'assigned'
        | 'unassigned'
        | 'labeled'
        | 'unlabeled'
        | 'locked'
        | 'unlocked'
        | 'transferred'
        | 'milestoned'
        | 'demilestoned';
      issue: IIssue;
      changes: { title: { from: string }; body: { from: string } };
      assignee: ISimpleUser;
      label?: {
        id?: number;
        node_id?: string;
        url?: string;
        name?: string;
        description?: string;
        color?: string;
        default?: boolean;
      };
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # label
    * Activity related to a label. The type of activity is specified in the `action` property of the payload object. For more information, see the "[labels](https://github.com/en/rest/reference/issues#labels)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be `created`, `edited`, or `deleted`. |
    | label | object | The label that was added. |
    | changes | object | The changes to the label if the action was `edited`. |
    | changes[name][from] | string | The previous version of the name if the action was `edited`. |
    | changes[color][from] | string | The previous version of the color if the action was `edited`. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'label',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'edited' | 'deleted';
      label: {
        id?: number;
        node_id?: string;
        url?: string;
        name?: string;
        description?: string;
        color?: string;
        default?: boolean;
      };
      changes: {
        name: {
          from: string;
        };
        color: { from: string };
      };
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # marketplace_purchase
    * Activity related to a GitHub Marketplace purchase. The type of activity is specified in the `action` property of the payload object. For more information, see the "[GitHub Marketplace](https://github.com/en/marketplace)."
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed for a [GitHub Marketplace](https://github.com/marketplace) plan. Can be one of:    | | | `purchased` - Someone purchased a GitHub Marketplace plan. The change should take effect on the account immediately. |
    | | | `pending_change` - You will receive the `pending_change` event when someone has downgraded or cancelled a GitHub Marketplace plan to indicate a change will occur on the account. The new plan or cancellation takes effect at the end of the billing cycle.  The `cancelled` or `changed` event type will be sent when the billing cycle has ended and the cancellation or new plan should take effect. |
    | | | `pending_change_<wbr>cancelled` - Someone has cancelled a pending change. Pending changes include plan cancellations and downgrades that will take effect at the end of a billing cycle.  |
    | | | `changed` - Someone has upgraded or downgraded a GitHub Marketplace plan and the change should take effect on the account immediately. |
    | | | `cancelled` - Someone cancelled a GitHub Marketplace plan and the last billing cycle has ended. The change should take effect on the account immediately. | |
  */
  on(
    event: 'marketplace_purchase',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'purchased' | 'pending_change' | 'pending_change_cancelled' | 'changed' | 'cancelled';
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # member
    * Activity related to repository collaborators. The type of activity is specified in the `action` property of the payload object. For more information, see the "[collaborators](https://github.com/en/rest/reference/repos#collaborators)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be one of:    | | |  `added` - A user accepts an invitation to a repository. |
    | | | `removed` - A user is removed as a collaborator in a repository. |
    | | | `edited` - A user's collaborator permissions have changed.  | |
    | member | object | The [user](https://github.com/en/rest/reference/users) that was added. |
    | changes | object | The changes to the collaborator permissions if the action was `edited`. |
    | changes[old_permission][from] | string | The previous permissions of the collaborator if the action was `edited`. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'member',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'added' | 'removed' | 'edited';
      member: ISimpleUser;
      changes: {
        old_permission: { from: string };
      };
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # membership
    * Activity related to team membership. The type of activity is specified in the `action` property of the payload object. For more information, see the "[team members](https://github.com/en/rest/reference/teams#members)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be `added` or `removed`. |
    | scope | string | The scope of the membership. Currently, can only be `team`. |
    | member | object | The [user](https://github.com/en/rest/reference/users) that was added or removed. |
    | team | object | The [team](https://github.com/en/rest/reference/teams) for the membership. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'membership',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'added' | 'removed';
      scope: string;
      member: ISimpleUser;
      team: ITeam;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # meta
    * The webhook this event is configured on was deleted. This event will only listen for changes to the particular hook the event is installed on. Therefore, it must be selected for each hook that you'd like to receive meta events for.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be `deleted`. |
    | hook_id | integer | The id of the modified webhook. |
    | hook | object | The modified webhook. This will contain different keys based on the type of webhook it is: repository, organization, business, app, or GitHub Marketplace. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'meta',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'deleted';
      hook_id: number;
      hook: IHook;
      repository?: IRepo;
      organization?: IOrg;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # milestone
    * Activity related to milestones. The type of activity is specified in the `action` property of the payload object. For more information, see the "[milestones](https://github.com/en/rest/reference/issues#milestones)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be one of `created`, `closed`, `opened`, `edited`, or `deleted`. |
    | milestone | object | The milestone itself. |
    | changes | object | The changes to the milestone if the action was `edited`. |
    | changes[description][from] | string | The previous version of the description if the action was `edited`. |
    | changes[due_on][from] | string | The previous version of the due date if the action was `edited`. |
    | changes[title][from] | string | The previous version of the title if the action was `edited`. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'milestone',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'closed' | 'opened' | 'edited' | 'deleted';
      milestone: IMilestone;
      changes: {
        description: { from: string };
        due_on: { from: string };
        title: { from: string };
      };
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # organization
    * Activity related to an organization and its members. The type of activity is specified in the `action` property of the payload object. For more information, see the "[organizations](https://github.com/en/rest/reference/orgs)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be one of: `deleted`, `renamed`, `member_added`, `member_removed`, or `member_invited`. |
    | invitation | object | The invitation for the user or email if the action is `member_invited`. |
    | membership | object | The membership between the user and the organization.  Not present when the action is `member_invited`. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'organization',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'deleted' | 'renamed' | 'member_added' | 'member_removed' | 'member_invited';
      invitation: IOrgInvitation;
      membership: IOrgMembership;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # org_block
    * Activity related to people being blocked in an organization. The type of activity is specified in the `action` property of the payload object. For more information, see the "[blocking organization users](https://github.com/en/rest/reference/orgs#blocking)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be `blocked` or `unblocked`. |
    | blocked_user | object | Information about the user that was blocked or unblocked. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'org_block',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'blocked' | 'unblocked';
      blocked_user: ISimpleUser;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # package
    * Activity related to GitHub Packages. The type of activity is specified in the `action` property of the payload object. For more information, see "[Managing packages with GitHub Packages](https://github.com/en/github/managing-packages-with-github-packages)" to learn more about GitHub Packages.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be `published` or `updated`. |
    | package | object | Information about the package. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'package',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'published' | 'updated';
      package: object;
      repository?: IRepo;
      organization?: IOrg;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # page_build
    * Represents an attempted build of a GitHub Pages site, whether successful or not. A push to a GitHub Pages enabled branch (`gh-pages` for project pages, the default branch for user and organization pages) triggers this event.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | id | integer | The unique identifier of the page build. |
    | build | object | The [List GitHub Pages builds](https://github.com/en/rest/reference/repos#list-github-pages-builds) itself. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'page_build',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      id: number;
      build: IPageBuild;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # ping
    * When you create a new webhook, we'll send you a simple `ping` event to let you know you've set up the webhook correctly. This event isn't stored so it isn't retrievable via the [Events API](https://github.com/en/rest/reference/activity#ping-a-repository-webhook) endpoint.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | zen | string | Random string of GitHub zen. |
    | hook_id | integer | The ID of the webhook that triggered the ping. |
    | hook | object | The [webhook configuration](https://github.com/en/rest/reference/repos#get-a-repository-webhook). |
    | hook[app_id] | integer | When you register a new GitHub App, GitHub sends a ping event to the     __webhook URL__ you specified during registration. The event contains the `app_id`, which is required for [authenticating](https://github.com/en/apps/building-integrations/setting-up-and-registering-github-apps/about-authentication-options-for-github-apps) an app. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'ping',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      zen: string;
      hook_id: number;
      hook: {
        app_id: number;
      };
      repository?: IRepo;
      organization?: IOrg;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # project_card
    * Activity related to project cards. The type of activity is specified in the `action` property of the payload object. For more information, see the "[project cards](https://github.com/en/rest/reference/projects#cards)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed on the project card. Can be `created`, `edited`, `moved`, `converted`, or `deleted`. |
    | changes | object | The changes to the project card if the action was `edited` or `converted`. |
    | changes[note][from] | string | The previous version of the note if the action was `edited` or `converted`. |
    | after_id | integer | The id of the card that this card now follows if the action was "moved". Will be `null` if it is the first card in a column. |
    | project_card | object | The [project card](https://github.com/en/rest/reference/projects#cards) itself. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'project_card',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'edited' | 'moved' | 'converted' | 'deleted';
      changes: {
        note: { from: string };
      };
      after_id: number;
      project_card: object;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # project_column
    * Activity related to columns in a project board. The type of activity is specified in the `action` property of the payload object. For more information, see the "[project columns](https://github.com/en/rest/reference/projects#columns)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed on the project column. Can be one of `created`, `edited`, `moved` or `deleted`. |
    | changes | object | The changes to the project column if the action was `edited`. |
    | changes[name][from] | string | The previous version of the name if the action was `edited`. |
    | after_id | integer | The id of the column that this column now follows if the action was "moved". Will be `null` if it is the first column in a project. |
    | project_column | object | The [project column](https://github.com/en/rest/reference/projects#columns) itself. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'project_column',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'edited' | 'moved' | 'deleted';
      changes: {
        name: { from: string };
      };
      after_id: number;
      project_column: IProjectColumn;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # project
    * Activity related to project boards. The type of activity is specified in the `action` property of the payload object. For more information, see the "[projects](https://github.com/en/rest/reference/projects)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed on the project. Can be one of `created`, `edited`, `closed`, `reopened`, or `deleted`. |
    | changes | object | The changes to the project if the action was `edited`. |
    | changes[name][from] | string | The previous version of the name if the action was `edited`. |
    | changes[body][from] | string | The previous version of the body if the action was `edited`. |
    | project | object | The [project](https://github.com/en/rest/reference/projects) itself. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'project',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'edited' | 'closed' | 'reopened' | 'deleted';
      changes: {
        name: { from: string };
        body: { from: string };
      };
      project: IProject;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # public
    * When a private repository is made public.  Without a doubt: the best GitHub event.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'public',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # pull_request
    * Activity related to pull requests. The type of activity is specified in the `action` property of the payload object. For more information, see the "[pull requests](https://github.com/en/rest/reference/pulls)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be one of:    | | | `assigned` |
    | | | `auto_merge_disabled` |
    | | | `auto_merge_enabled` |
    | | | `closed`: If the action is `closed` and the `merged` key is `false`, the pull request was closed with unmerged commits. If the action is `closed` and the `merged` key is `true`, the pull request was merged. |
    | | | `converted_to_<wbr>draft` |
    | | | `edited` |
    | | | `labeled` |
    | | | `locked` |
    | | | `opened` |
    | | | `ready_for_review` |
    | | | `reopened` |
    | | | `review_request_<wbr>removed` |
    | | | `review_requested` |
    | | | `synchronize`: Triggered when a pull request's head branch is updated. For example, when the head branch is updated from the base branch, when new commits are pushed to the head branch, or when the base branch is changed. |
    | | | `unassigned` |
    | | | `unlabeled` |
    | | | `unlocked` | |
    | number | integer | The pull request number. |
    | changes | object | The changes to the comment if the action was `edited`. |
    | changes[title][from] | string | The previous version of the title if the action was `edited`. |
    | changes[body][from] | string | The previous version of the body if the action was `edited`. |
    | pull_request | object | The [pull request](https://github.com/en/rest/reference/pulls) itself. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'pull_request',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action:
        | 'assigned'
        | 'auto_merge_disabled'
        | 'auto_merge_enabled'
        | 'closed'
        | 'converted_to_draft'
        | 'edited'
        | 'labeled'
        | 'locked'
        | 'opened'
        | 'ready_for_review'
        | 'reopened'
        | 'review_request_removed'
        | 'review_requested'
        | 'synchronize'
        | 'unassigned'
        | 'unlabeled'
        | 'unlocked';
      number: number;
      changes: {
        title: { from: string };
        body: { from: string };
      };
      pull_request: IPullRequest;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # pull_request_review
    * Activity related to pull request reviews. The type of activity is specified in the `action` property of the payload object. For more information, see the "[pull request reviews](https://github.com/en/rest/reference/pulls#reviews)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be one of:    | | | `submitted` - A pull request review is submitted into a non-pending state. |
    | | | `edited` - The body of a review has been edited. |
    | | | `dismissed` - A review has been dismissed. | |
    | pull_request | object | The [pull request](https://github.com/en/rest/reference/pulls) the review pertains to. |
    | review | object | The review that was affected. |
    | changes[body][from] | string | The previous version of the body if the action was `edited`. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'pull_request_review',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'submitted' | 'edited' | 'dismissed';
      pull_request: IPullRequest;
      review: IPullRequestReview;
      changes: { body: { from: string } };
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # pull_request_review_comment
    * Activity related to pull request review comments in the pull request's unified diff. The type of activity is specified in the `action` property of the payload object. For more information, see the "[pull request review comments](https://github.com/en/rest/reference/pulls#comments)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed on the comment. Can be one of `created`, `edited`, or `deleted`. |
    | changes | object | The changes to the comment if the action was `edited`. |
    | changes[body][from] | string | The previous version of the body if the action was `edited`. |
    | pull_request | object | The [pull request](https://github.com/en/rest/reference/pulls) the comment belongs to. |
    | comment | object | The [comment](https://github.com/en/rest/reference/pulls#comments) itself. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'pull_request_review_comment',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'edited' | 'deleted';
      changes: {
        body: { from: string };
      };
      pull_request: IPullRequest;
      comment: IPullRequestReviewComment;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # push
    * One or more commits are pushed to a repository branch or tag.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | ref | string | The full [`git ref`](https://github.com/en/rest/reference/git#refs) that was pushed. Example: `refs/heads/main` or `refs/tags/v3.14.1`. |
    | before | string | The SHA of the most recent commit on `ref` before the push. |
    | after | string | The SHA of the most recent commit on `ref` after the push. |
    | created | boolean | Whether this push created the `ref`. |
    | deleted | boolean | Whether this push deleted the `ref`. |
    | forced | boolean | Whether this push was a force push of the `ref`. |
    | head_commit | object | For pushes where `after` is or points to a commit object, an expanded representation of that commit. For pushes where `after` refers to an annotated tag object,  an expanded representation of the commit pointed to by the annotated tag. |
    | compare | string | URL that shows the changes in this `ref` update, from the `before` commit to the `after` commit. For a newly created `ref` that is directly based on the default branch, this is the comparison between the head of the default branch and the `after` commit. Otherwise, this shows all commits until the `after` commit. |
    | commits | array | An array of commit objects describing the pushed commits. (Pushed commits are all commits that are included in the `compare` between the `before` commit and the `after` commit.) The array includes a maximum of 20 commits. If necessary, you can use the [Commits API](https://github.com/en/rest/reference/repos#commits) to fetch additional commits. This limit is applied to timeline events only and isn't applied to webhook deliveries. |
    | commits[][id] | string | The SHA of the commit. |
    | commits[][timestamp] | string | The ISO 8601 timestamp of the commit. |
    | commits[][message] | string | The commit message. |
    | commits[][author] | object | The git author of the commit. |
    | commits[][author][name] | string | The git author's name. |
    | commits[][author][email] | string | The git author's email address. |
    | commits[][url] | url | URL that points to the commit API resource. |
    | commits[][distinct] | boolean | Whether this commit is distinct from any that have been pushed before. |
    | commits[][added] | array | An array of files added in the commit. |
    | commits[][modified] | array | An array of files modified by the commit. |
    | commits[][removed] | array | An array of files removed in the commit. |
    | pusher | object | The user who pushed the commits. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'push',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      ref: string;
      before: string;
      after: string;
      created: boolean;
      deleted: boolean;
      forced: boolean;
      head_commit: object;
      compare: string;
      commits: {
        id: string;
        timestamp: string;
        message: string;
        author: {
          name: string;
          email: string;
          url: string;
          distinct: boolean;
          added: any[];
          modified: any[];
          removed: any[];
        };
      }[];
      pusher: ISimpleUser;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # release
    * Activity related to a release. The type of activity is specified in the `action` property of the payload object. For more information, see the "[releases](https://github.com/en/rest/reference/repos#releases)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be one of:    | | | `published`: a release, pre-release, or draft of a release is published |
    | | | `unpublished`: a release or pre-release is deleted |
    | | | `created`: a draft is saved, or a release or pre-release is published without previously being saved as a draft |
    | | | `edited`: a release, pre-release, or draft release is edited |
    | | | `deleted`: a release, pre-release, or draft release is deleted |
    | | | `prereleased`: a pre-release is created |
    | | | `released`: a release or draft of a release is published, or a pre-release is changed to a release | |
    | changes[body][from] | string | The previous version of the body if the action was `edited`. |
    | changes[name][from] | string | The previous version of the name if the action was `edited`. |
    | release | object | The [release](https://github.com/en/rest/reference/repos/#get-a-release) object. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'release',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'unpublished' | 'created' | 'edited' | 'deleted' | 'prereleased' | 'released';
      changes: {
        name: { from: string };
        body: { from: string };
      };
      release: IRelease;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # repository_dispatch
    * This event occurs when a GitHub App sends a `POST` request to the "[Create a repository dispatch event](https://github.com/en/rest/reference/repos#create-a-repository-dispatch-event)" endpoint.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. This can be one of:    | | | `created` - A repository is created. |
    | | | `deleted` - A repository is deleted. |
    | | | `archived` - A repository is archived. |
    | | | `unarchived` - A repository is unarchived. |
    | | | `edited` - A repository's information is edited. |
    | | | `renamed` - A repository is renamed. |
    | | | `transferred` - A repository is transferred. |
    | | | `publicized` - A repository is made public. |
    | | |  `privatized` - A repository is made private. | |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'repository_dispatch',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: string;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # repository
    * Activity related to a repository. The type of activity is specified in the `action` property of the payload object. For more information, see the "[repositories](https://github.com/en/rest/reference/repos)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. This can be one of:    | | | `created` - A repository is created. |
    | | | `deleted` - A repository is deleted. |
    | | | `archived` - A repository is archived. |
    | | | `unarchived` - A repository is unarchived. |
    | | | `edited` - A repository's information is edited. |
    | | | `renamed` - A repository is renamed. |
    | | | `transferred` - A repository is transferred. |
    | | | `publicized` - A repository is made public. |
    | | |  `privatized` - A repository is made private. | |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'repository',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action:
        | 'created'
        | 'deleted'
        | 'archived'
        | 'unarchived'
        | 'edited'
        | 'renamed'
        | 'transferred'
        | 'publicized'
        | 'privatized';
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # repository_import
    * Activity related to a repository being imported to GitHub. The type of activity is specified in the `action` property of the payload object. For more information, see the "[source imports](https://github.com/en/rest/reference/migrations#source-imports)" REST API. To receive this event for a personal repository, you must create an empty repository prior to the import. This event can be triggered using either the [GitHub Importer](https://github.com/en/articles/importing-a-repository-with-github-importer) or the [Source imports API](https://github.com/en/rest/reference/migrations#source-imports).
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | status | string | The final state of the import. This can be one of `success`, `cancelled`, or `failure`. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'repository_import',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      status: 'success' | 'cancelled' | 'failure';
      repository?: IRepo;
      organization?: IOrg;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # repository_vulnerability_alert
    * Activity related to security vulnerability alerts in a repository. The type of activity is specified in the `action` property of the payload object. For more information, see the "[About alerts for vulnerable dependencies](https://github.com/en/github/managing-security-vulnerabilities/about-alerts-for-vulnerable-dependencies)".
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. This can be one of `create`, `dismiss`, or `resolve`. |
    | alert | object | The security alert of the vulnerable dependency. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'repository_vulnerability_alert',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'create' | 'dismiss' | 'resolve';
      alert: IVulnerabilityScanningAlert;
      repository?: IRepo;
      organization?: IOrg;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # secret_scanning_alert
    * Activity related to secret scanning alerts in a repository. The type of activity is specified in the action property of the payload object. For more information, see "[About secret scanning](https://github.com/en/github/administering-a-repository/about-secret-scanning)."
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. This can be either `created`, `resolved`, or `reopened`. |
    | alert | object | The secret scanning alert involved in the event. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | If the `action` is `resolved` or `reopened`, the `sender` object will be the user that triggered the event. The `sender` object is empty for all other actions. |
  */
  on(
    event: 'secret_scanning_alert',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'resolved' | 'reopened';
      alert: ISecretScanningAlert;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # security_advisory
    * Activity related to a security advisory. A security advisory provides information about security-related vulnerabilities in software on GitHub. The security advisory dataset also powers the GitHub security alerts, see "[About alerts for vulnerable dependencies](https://github.com/en/github/managing-security-vulnerabilities/about-alerts-for-vulnerable-dependencies)."
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. The action can be one of `published`, `updated`, `performed`, or `withdrawn` for all new events. |
    | security_advisory | object | The details of the security advisory, including summary, description, and severity. |
  */
  on(
    event: 'security_advisory',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'published' | 'updated' | 'performed' | 'withdrawn';
      security_advisory: object;
    }) => void,
  ): this;
  /**
    # sponsorship
    * Activity related to a sponsorship listing. The type of activity is specified in the `action` property of the payload object. For more information, see "[About GitHub Sponsors](https://github.com/en/sponsors/getting-started-with-github-sponsors/about-github-sponsors)".
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. This can be one of `created`, `cancelled`, `edited`, `tier_changed`, `pending_cancellation`, or `pending_tier_<wbr>change`. Note: The `created` action is only triggered after payment is processed. |
    | effective_date | string | The `pending_cancellation` and `pending_tier_<wbr>change` event types will include the date the cancellation or tier change will take effect. |
    | changes[tier][from] | object | The `tier_changed` and `pending_tier_<wbr>change` will include the original tier before the change or pending change. For more information, see the [pending tier change payload](https://github.com/en/webhooks/event-payloads#webhook-payload-example-when-someone-downgrades-a-sponsorship). |
    | changes[privacy_level][from] | string | The `edited` event types include the details about the change when someone edits a sponsorship to change the privacy. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'sponsorship',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'cancelled' | 'edited' | 'tier_changed' | 'pending_cancellation' | 'pending_tier_change';
      effective_date: string;
      changes: {
        tier: { from: object };
        privacy_level: { from: string };
      };
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # star
    * Activity related to a repository being starred. The type of activity is specified in the `action` property of the payload object. For more information, see the "[starring](https://github.com/en/rest/reference/activity#starring)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be `created` or `deleted`. |
    | starred_at | string | The time the star was created. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. Will be `null` for the `deleted` action. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'star',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'deleted';
      starred_at: string;
      repository?: IRepo;
      organization?: IOrg;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # status
    * When the status of a Git commit changes. The type of activity is specified in the `action` property of the payload object. For more information, see the "[statuses](https://github.com/en/rest/reference/repos#statuses)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | id | integer | The unique identifier of the status. |
    | sha | string | The Commit SHA. |
    | state | string | The new state. Can be `pending`, `success`, `failure`, or `error`. |
    | description | string | The optional human-readable description added to the status. |
    | target_url | string | The optional link added to the status. |
    | branches | array | An array of branch objects containing the status' SHA. Each branch contains the given SHA, but the SHA may or may not be the head of the branch. The array includes a maximum of 10 branches. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'status',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      id: number;
      sha: string;
      state: 'pending' | 'success' | 'failure' | 'error';
      description: string;
      target_url: string;
      branches: any[];
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # team
    * Activity related to an organization's team. The type of activity is specified in the `action` property of the payload object. For more information, see the "[teams](https://github.com/en/rest/reference/teams)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be one of `created`, `deleted`, `edited`, `added_to_repository`, or `removed_from_<wbr>repository`. |
    | team | object | The team itself. |
    | changes | object | The changes to the team if the action was `edited`. |
    | changes[description][from] | string | The previous version of the description if the action was `edited`. |
    | changes[name][from] | string | The previous version of the name if the action was `edited`. |
    | changes[privacy][from] | string | The previous version of the team's privacy if the action was `edited`. |
    | changes[repository][permissions][from][admin] | boolean | The previous version of the team member's `admin` permission on a repository, if the action was `edited`. |
    | changes[repository][permissions][from][pull] | boolean | The previous version of the team member's `pull` permission on a repository, if the action was `edited`. |
    | changes[repository][permissions][from][push] | boolean | The previous version of the team member's `push` permission on a repository, if the action was `edited`. |
    | repository | object | The repository that was added or removed from to the team's purview if the action was `added_to_repository`, `removed_from_<wbr>repository`, or `edited`. For `edited` actions, `repository` also contains the team's new permission levels for the repository. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'team',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'created' | 'deleted' | 'edited' | 'added_to_repository' | 'removed_from_repository';
      team: ISimpleTeam;
      changes: {
        description: { from: string };
        name: { from: string };
        privacy: { from: string };
        repository: {
          permissions: {
            from: {
              admin: boolean;
              pull: boolean;
              push: boolean;
            };
          };
        };
      };
      repository?: IRepo;
      organization?: IOrg;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # team_add
    * When a [repository is added to a team](https://github.com/en/rest/reference/teams#add-or-update-team-repository-permissions).
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | team | object | The [team](https://github.com/en/rest/reference/teams) that was modified.      __Note:__ Older events may not include this in the payload. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'team_add',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      team: ISimpleTeam;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # watch
    * When someone stars a repository. The type of activity is specified in the `action` property of the payload object. For more information, see the "[starring](https://github.com/en/rest/reference/activity#starring)" REST API.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Currently, can only be `started`. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | installation | object | The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'watch',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: string;
      repository?: IRepo;
      organization?: IOrg;
      installation?: IInstallation;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # workflow_dispatch
    * This event occurs when someone triggers a workflow run on GitHub or sends a `POST` request to the "[Create a workflow dispatch event](https://github.com/en/rest/reference/actions/#create-a-workflow-dispatch-event)" endpoint. For more information, see "[Events that trigger workflows](https://github.com/en/actions/reference/events-that-trigger-workflows#workflow_dispatch)."
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be one of:     | | |  `queued` - A new job was created. |
    | | |  `in_progress` - The job has started processing on the runner. |
    | | |  `completed` - The `status` of the job is `completed`. | |
    | workflow_job | object | The workflow job. Many `workflow_job` keys, such as `head_sha`, `conclusion`, and `started_at` are the same as those in a [`check_run`](https://github.com/_display/?editor_console=true#check_run) object. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'workflow_dispatch',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: string;
      workflow_job: object;
      repository?: IRepo;
      organization?: IOrg;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # workflow_job
    * A GitHub Actions workflow job has been queued, is in progress, or has been completed on a repository. The type of activity is specified in the `action` property of the payload object.
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action performed. Can be one of:     | | |  `queued` - A new job was created. |
    | | |  `in_progress` - The job has started processing on the runner. |
    | | |  `completed` - The `status` of the job is `completed`. | |
    | workflow_job | object | The workflow job. Many `workflow_job` keys, such as `head_sha`, `conclusion`, and `started_at` are the same as those in a [`check_run`](https://github.com/_display/?editor_console=true#check_run) object. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'workflow_job',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'queued' | 'in_progress' | 'completed';
      workflow_job: object;
      repository?: IRepo;
      organization?: IOrg;
      sender?: ISimpleUser;
    }) => void,
  ): this;
  /**
    # workflow_run
    * When a GitHub Actions workflow run is requested or completed. For more information, see "[Events that trigger workflows](https://github.com/en/actions/reference/events-that-trigger-workflows#workflow_run)."
    * 
    * Payload types:
    *
    | Key | Type | Description |
    | - | - | - |
    | action | string | The action that was performed. Can be one of `requested` or `completed`. |
    | workflow_run | object | The workflow run. Many `workflow_run` keys, such as `head_branch`, `conclusion`, and `pull_requests` are the same as those in a [`check_suite`](https://github.com/_display/?editor_console=true#check_suite) object. |
    | workflow | object | The workflow that generated the workflow run. |
    | organization | object | Webhook payloads contain the [`organization`](https://github.com/en/rest/reference/orgs#get-an-organization) object when the webhook is configured for an organization or the event occurs from activity in a repository owned by an organization. |
    | repository | object | The [`repository`](https://github.com/en/rest/reference/repos#get-a-repository) where the event occurred. |
    | sender | object | The user that triggered the event. |
  */
  on(
    event: 'workflow_run',
    callback: (response: {
      rawHeaders: object;
      deliveryId: string;
      RequestId: string;
      action: 'requested' | 'completed';
      workflow_run: object;
      workflow?: object;
      organization?: IOrg;
      repository?: IRepo;
      sender?: ISimpleUser;
    }) => void,
  ): this;
}

interface IGitHubHooksOptions {
  webhookSecret?: string;
  key?: string;
  cert?: string;
}

export class GitHubHooks extends EventEmitter {
  private webServer = httpServer.createServer();
  constructor(private options?: IGitHubHooksOptions) {
    super();
    this.webServer =
      this.options?.key && this.options.cert
        ? httpsServer.createServer({ key: this.options.key, cert: this.options.cert }, this.handler)
        : httpServer.createServer(this.handler);
  }

  private bodyReader = async (req: httpServer.IncomingMessage): Promise<string | false> =>
    new Promise((res) => {
      var data = '';
      req
        .on('data', (chunck) => {
          data += chunck;
          if (data.length > 1e6) res(false);
        })
        .on('end', () => res(data));
    });

  handler = async (req: httpServer.IncomingMessage, res: httpServer.ServerResponse) => {
    var rawBody = await this.bodyReader(req);
    if (rawBody === false) return res.writeHead(413).end();
    var headers = req.headers;

    if (req.method !== 'POST') return res.writeHead(405).end();

    if (
      !headers['content-type'] ||
      (headers['content-type'] !== 'application/x-www-form-urlencoded' &&
        headers['content-type'] !== 'application/json')
    )
      return res.writeHead(400).end();

    if (
      this.options &&
      this.options.webhookSecret &&
      !crypto.timingSafeEqual(
        Buffer.from(
          `sha256=${crypto.createHmac('sha256', this.options.webhookSecret).update(rawBody).digest('hex')}`,
          'utf-8',
        ),
        Buffer.from(headers['x-hub-signature-256'] as string, 'utf-8'),
      )
    )
      return res.writeHead(401).end();

    var body = {};

    try {
      body = JSON.parse(
        headers['content-type'] === 'application/json'
          ? rawBody
          : decodeURIComponent(rawBody).substring('payload='.length),
      );
    } catch (error) {
      return res.writeHead(400);
    }

    this.emit(headers['x-github-event'] as string, {
      ...body,
      rawHeaders: headers,
      deliveryId: headers['x-github-delivery'],
      RequestId: headers['x-github-hook-id'],
    });

    res.writeHead(200).end();
  };

  listen = (port?: number, listeningListener?: () => void) => this.webServer.listen(port, listeningListener);
}
