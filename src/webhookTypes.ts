export interface ISimpleUser {
  name?: string | null;
  email?: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at?: string;
}

export interface ILicenseSimple {
  key: string;
  name: string;
  url: string | null;
  spdx_id: string | null;
  node_id: string;
  html_url?: string;
}

export interface ICodeOfConductSimple {
  url: string;
  key: string;
  name: string;
  html_url: string | null;
}

export interface IRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: ISimpleUser;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url: string;
  mirror_url: string | null;
  hooks_url: string;
  svn_url: string;
  homepage: string | null;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  open_issues_count: number;
  is_template?: boolean;
  topics?: string[];
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  archived: boolean;
  /** Returns whether or not this repository disabled. */
  disabled: boolean;
  /** The repository visibility: public, private, or internal. */
  visibility?: string;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  permissions?: {
    admin: boolean;
    maintain?: boolean;
    push: boolean;
    triage?: boolean;
    pull: boolean;
  };
  allow_rebase_merge?: boolean;
  template_repository?: IRepo | null;
  temp_clone_token?: string | null;
  allow_squash_merge?: boolean;
  allow_auto_merge?: boolean;
  delete_branch_on_merge?: boolean;
  allow_merge_commit?: boolean;
  allow_forking?: boolean;
  subscribers_count: number;
  network_count: number;
  license: ILicenseSimple | null;
  organization?: ISimpleUser | null;
  parent?: IRepo;
  source?: IRepo;
  forks: number;
  master_branch?: string;
  open_issues: number;
  watchers: number;
  /** Whether anonymous git access is allowed. */
  anonymous_access_enabled?: boolean;
  code_of_conduct?: ICodeOfConductSimple;
  security_and_analysis?: {
    advanced_security?: {
      status?: 'enabled' | 'disabled';
    };
    secret_scanning?: {
      status?: 'enabled' | 'disabled';
    };
  } | null;
}

export interface IOrg {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string | null;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  twitter_username?: string | null;
  is_verified?: boolean;
  has_organization_projects: boolean;
  has_repository_projects: boolean;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
  type: string;
  total_private_repos?: number;
  owned_private_repos?: number;
  private_gists?: number | null;
  disk_usage?: number | null;
  collaborators?: number | null;
  billing_email?: string | null;
  plan?: {
    name: string;
    space: number;
    private_repos: number;
    filled_seats?: number;
    seats?: number;
  };
  default_repository_permission?: string | null;
  members_can_create_repositories?: boolean | null;
  two_factor_requirement_enabled?: boolean | null;
  members_allowed_repository_creation_type?: string;
  members_can_create_public_repositories?: boolean;
  members_can_create_private_repositories?: boolean;
  members_can_create_internal_repositories?: boolean;
  members_can_create_pages?: boolean;
  members_can_create_public_pages?: boolean;
  members_can_create_private_pages?: boolean;
  updated_at: string;
}

export interface IIntegration {
  /** Unique identifier of the GitHub app */
  id: number;
  /** The slug name of the GitHub app */
  slug?: string;
  node_id: string;
  owner: ISimpleUser | null;
  /** The name of the GitHub app */
  name: string;
  description: string | null;
  external_url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  /** The set of permissions for the GitHub app */
  permissions: {
    issues?: string;
    checks?: string;
    metadata?: string;
    contents?: string;
    deployments?: string;
  } & { [key: string]: string };
  /** The list of events for the GitHub app */
  events: string[];
  /** The number of installations associated with the GitHub app */
  installations_count?: number;
  client_id?: string;
  client_secret?: string;
  webhook_secret?: string | null;
  pem?: string;
}

export interface IPullRequestMinimal {
  id: number;
  number: number;
  url: string;
  head: {
    ref: string;
    sha: string;
    repo: {
      id: number;
      url: string;
      name: string;
    };
  };
  base: {
    ref: string;
    sha: string;
    repo: {
      id: number;
      url: string;
      name: string;
    };
  };
}

export interface IDeploymentSimple {
  url: string;
  /** Unique identifier of the deployment */
  id: number;
  node_id: string;
  /** Parameter to specify a task to execute */
  task: string;
  original_environment?: string;
  /** Name for the target deployment environment. */
  environment: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  statuses_url: string;
  repository_url: string;
  /** Specifies if the given environment is will no longer exist at some point in the future. Default: false. */
  transient_environment?: boolean;
  /** Specifies if the given environment is one that end-users directly interact with. Default: false. */
  production_environment?: boolean;
  performed_via_github_app?: IIntegration | null;
}

export interface IMinimalRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: ISimpleUser;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url?: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url?: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url?: string;
  mirror_url?: string | null;
  hooks_url: string;
  svn_url?: string;
  homepage?: string | null;
  language?: string | null;
  forks_count?: number;
  stargazers_count?: number;
  watchers_count?: number;
  size?: number;
  default_branch?: string;
  open_issues_count?: number;
  is_template?: boolean;
  topics?: string[];
  has_issues?: boolean;
  has_projects?: boolean;
  has_wiki?: boolean;
  has_pages?: boolean;
  has_downloads?: boolean;
  archived?: boolean;
  disabled?: boolean;
  visibility?: string;
  pushed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  permissions?: {
    admin?: boolean;
    maintain?: boolean;
    push?: boolean;
    triage?: boolean;
    pull?: boolean;
  };
  template_repository?: IRepo | null;
  temp_clone_token?: string;
  delete_branch_on_merge?: boolean;
  subscribers_count?: number;
  network_count?: number;
  code_of_conduct?: ICodeOfConductSimple;
  license?: {
    key?: string;
    name?: string;
    spdx_id?: string;
    url?: string;
    node_id?: string;
  } | null;
  forks?: number;
  open_issues?: number;
  watchers?: number;
  allow_forking?: boolean;
}

export interface ISimpleCommit {
  id: string;
  tree_id: string;
  message: string;
  timestamp: string;
  author: {
    name: string;
    email: string;
  } | null;
  committer: {
    name: string;
    email: string;
  } | null;
}

export interface ICheckSuit {
  id: number;
  node_id: string;
  head_branch: string | null;
  /** The SHA of the head commit that is being checked. */
  head_sha: string;
  status: ('queued' | 'in_progress' | 'completed') | null;
  conclusion: ('success' | 'failure' | 'neutral' | 'cancelled' | 'skipped' | 'timed_out' | 'action_required') | null;
  url: string | null;
  before: string | null;
  after: string | null;
  pull_requests: IPullRequestMinimal[] | null;
  app: IIntegration;
  repository: IMinimalRepo;
  created_at: string | null;
  updated_at: string | null;
  head_commit: ISimpleCommit;
  latest_check_runs_count: number;
  check_runs_url: string;
}

export interface ICheckRun {
  /** The id of the check. */
  id: number;
  /** The SHA of the commit that is being checked. */
  head_sha: string;
  node_id: string;
  external_id: string | null;
  url: string;
  html_url: string | null;
  details_url: string | null;
  /** The phase of the lifecycle that the check is currently in. */
  status: 'queued' | 'in_progress' | 'completed';
  conclusion: ('success' | 'failure' | 'neutral' | 'cancelled' | 'skipped' | 'timed_out' | 'action_required') | null;
  started_at: string | null;
  completed_at: string | null;
  output: {
    title: string | null;
    summary: string | null;
    text: string | null;
    annotations_count: number;
    annotations_url: string;
  };
  /** The name of the check. */
  name: string;
  check_suite: ICheckSuit | null;
  app: IIntegration;
  pull_requests: IPullRequestMinimal[];
  deployment?: IDeploymentSimple;
}

export interface IEnterprise {
  /** A short description of the enterprise. */
  description?: string | null;
  html_url: string;
  /** The enterprise's website URL. */
  website_url?: string | null;
  /** Unique identifier of the enterprise */
  id: number;
  node_id: string;
  /** The name of the enterprise. */
  name: string;
  /** The slug url identifier for the enterprise. */
  slug: string;
  created_at: string | null;
  updated_at: string | null;
  avatar_url: string;
}

export interface IAppPermissions {
  /** The level of permission to grant the access token for GitHub Actions workflows, workflow runs, and artifacts. Can be one of: `read` or `write`. */
  actions?: 'read' | 'write';
  /** The level of permission to grant the access token for repository creation, deletion, settings, teams, and collaborators creation. Can be one of: `read` or `write`. */
  administration?: 'read' | 'write';
  /** The level of permission to grant the access token for checks on code. Can be one of: `read` or `write`. */
  checks?: 'read' | 'write';
  /** The level of permission to grant the access token for notification of content references and creation content attachments. Can be one of: `read` or `write`. */
  content_references?: 'read' | 'write';
  /** The level of permission to grant the access token for repository contents, commits, branches, downloads, releases, and merges. Can be one of: `read` or `write`. */
  contents?: 'read' | 'write';
  /** The level of permission to grant the access token for deployments and deployment statuses. Can be one of: `read` or `write`. */
  deployments?: 'read' | 'write';
  /** The level of permission to grant the access token for managing repository environments. Can be one of: `read` or `write`. */
  environments?: 'read' | 'write';
  /** The level of permission to grant the access token for issues and related comments, assignees, labels, and milestones. Can be one of: `read` or `write`. */
  issues?: 'read' | 'write';
  /** The level of permission to grant the access token to search repositories, list collaborators, and access repository metadata. Can be one of: `read` or `write`. */
  metadata?: 'read' | 'write';
  /** The level of permission to grant the access token for packages published to GitHub Packages. Can be one of: `read` or `write`. */
  packages?: 'read' | 'write';
  /** The level of permission to grant the access token to retrieve Pages statuses, configuration, and builds, as well as create new builds. Can be one of: `read` or `write`. */
  pages?: 'read' | 'write';
  /** The level of permission to grant the access token for pull requests and related comments, assignees, labels, milestones, and merges. Can be one of: `read` or `write`. */
  pull_requests?: 'read' | 'write';
  /** The level of permission to grant the access token to manage the post-receive hooks for a repository. Can be one of: `read` or `write`. */
  repository_hooks?: 'read' | 'write';
  /** The level of permission to grant the access token to manage repository projects, columns, and cards. Can be one of: `read`, `write`, or `admin`. */
  repository_projects?: 'read' | 'write' | 'admin';
  /** The level of permission to grant the access token to view and manage secret scanning alerts. Can be one of: `read` or `write`. */
  secret_scanning_alerts?: 'read' | 'write';
  /** The level of permission to grant the access token to manage repository secrets. Can be one of: `read` or `write`. */
  secrets?: 'read' | 'write';
  /** The level of permission to grant the access token to view and manage security events like code scanning alerts. Can be one of: `read` or `write`. */
  security_events?: 'read' | 'write';
  /** The level of permission to grant the access token to manage just a single file. Can be one of: `read` or `write`. */
  single_file?: 'read' | 'write';
  /** The level of permission to grant the access token for commit statuses. Can be one of: `read` or `write`. */
  statuses?: 'read' | 'write';
  /** The level of permission to grant the access token to retrieve Dependabot alerts. Can be one of: `read`. */
  vulnerability_alerts?: 'read';
  /** The level of permission to grant the access token to update GitHub Actions workflow files. Can be one of: `write`. */
  workflows?: 'write';
  /** The level of permission to grant the access token for organization teams and members. Can be one of: `read` or `write`. */
  members?: 'read' | 'write';
  /** The level of permission to grant the access token to manage access to an organization. Can be one of: `read` or `write`. */
  organization_administration?: 'read' | 'write';
  /** The level of permission to grant the access token to manage the post-receive hooks for an organization. Can be one of: `read` or `write`. */
  organization_hooks?: 'read' | 'write';
  /** The level of permission to grant the access token for viewing an organization's plan. Can be one of: `read`. */
  organization_plan?: 'read';
  /** The level of permission to grant the access token to manage organization projects, columns, and cards. Can be one of: `read`, `write`, or `admin`. */
  organization_projects?: 'read' | 'write' | 'admin';
  /** The level of permission to grant the access token for organization packages published to GitHub Packages. Can be one of: `read` or `write`. */
  organization_packages?: 'read' | 'write';
  /** The level of permission to grant the access token to manage organization secrets. Can be one of: `read` or `write`. */
  organization_secrets?: 'read' | 'write';
  /** The level of permission to grant the access token to view and manage GitHub Actions self-hosted runners available to an organization. Can be one of: `read` or `write`. */
  organization_self_hosted_runners?: 'read' | 'write';
  /** The level of permission to grant the access token to view and manage users blocked by the organization. Can be one of: `read` or `write`. */
  organization_user_blocking?: 'read' | 'write';
  /** The level of permission to grant the access token to manage team discussions and related comments. Can be one of: `read` or `write`. */
  team_discussions?: 'read' | 'write';
}

export interface IInstallation {
  /** The ID of the installation. */
  id: number;
  account: (Partial<ISimpleUser> & Partial<IEnterprise>) | null;
  /** Describe whether all repositories have been selected or there's a selection involved */
  repository_selection: 'all' | 'selected';
  access_tokens_url: string;
  repositories_url: string;
  html_url: string;
  app_id: number;
  /** The ID of the user or organization this token is being scoped to. */
  target_id: number;
  target_type: string;
  permissions: IAppPermissions;
  events: string[];
  created_at: string;
  updated_at: string;
  single_file_name: string | null;
  has_multiple_single_files?: boolean;
  single_file_paths?: string[];
  app_slug: string;
  suspended_by: ISimpleUser | null;
  suspended_at: string | null;
  contact_email?: string | null;
}

export interface ICodeScanningAlert {
  number: number;
  created_at: string;
  url: string;
  html_url: string;
  instances_url: string;
  state: 'open' | 'closed' | 'dismissed' | 'fixed';
  dismissed_by: ISimpleUser | null;
  dismissed_at: string | null;
  dismissed_reason: ('false positive' | "won't fix" | 'used in tests') | null;
  rule: {
    /** A unique identifier for the rule used to detect the alert. */
    id?: string | null;
    /** The name of the rule used to detect the alert. */
    name?: string;
    /** The severity of the alert. */
    severity?: ('none' | 'note' | 'warning' | 'error') | null;
    /** The security severity of the alert. */
    security_severity_level?: ('low' | 'medium' | 'high' | 'critical') | null;
    /** A short description of the rule used to detect the alert. */
    description?: string;
    /** description of the rule used to detect the alert. */
    full_description?: string;
    /** A set of tags applicable for the rule. */
    tags?: string[] | null;
    /** Detailed documentation for the rule as GitHub Flavored Markdown. */
    help?: string | null;
  };
  tool: {
    name?: string;
    version?: string | null;
    guid?: string | null;
  };
  most_recent_instance: {
    ref?: string;
    analysis_key?: string;
    environment?: string;
    category?: string;
    state?: 'open' | 'closed' | 'dismissed' | 'fixed';
    commit_sha?: string;
    message?: {
      text?: string;
    };
    location?: {
      path?: string;
      start_line?: number;
      end_line?: number;
      start_column?: number;
      end_column?: number;
    };
    html_url?: string;
    /**
     * Classifications that have been applied to the file that triggered the alert.
     * For example identifying it as documentation, or a generated file.
     */
    classifications?: ('source' | 'generated' | 'test' | 'library') | null[];
  };
}

export interface ISecretScanningAlert {
  number?: number;
  created_at?: string;
  url?: string;
  html_url?: string;
  /** The REST API URL of the code locations for this alert. */
  locations_url?: string;
  state?: 'open' | 'resolved';
  resolution?: 'false_positive' | 'wont_fix' | 'revoked' | 'used_in_tests';
  /** The time that the alert was resolved in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`. */
  resolved_at?: string | null;
  resolved_by?: ISimpleUser | null;
  /** The type of secret that secret scanning detected. */
  secret_type?: string;
  /** The secret that was detected. */
  secret?: string;
}

export interface IVulnerabilityScanningAlert {
  id?: number;
  affected_range?: string;
  affected_package_name?: string;
  fixed_in?: string;
  external_reference?: string;
  external_identifier?: string;
  severity?: string;
  ghsa_id?: string;
  created_at?: string;
}

export interface ICommitComment {
  html_url: string;
  url: string;
  id: number;
  node_id: string;
  body: string;
  path: string | null;
  position: number | null;
  line: number | null;
  commit_id: string;
  user: ISimpleUser | null;
  created_at: string;
  updated_at: string;
  author_association:
    | 'COLLABORATOR'
    | 'CONTRIBUTOR'
    | 'FIRST_TIMER'
    | 'FIRST_TIME_CONTRIBUTOR'
    | 'MANNEQUIN'
    | 'MEMBER'
    | 'NONE'
    | 'OWNER';
  reactions?: {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    confused: number;
    heart: number;
    hooray: number;
    eyes: number;
    rocket: number;
  };
}

export interface IIssueComment {
  /** Unique identifier of the issue comment */
  id: number;
  node_id: string;
  /** URL for the issue comment */
  url: string;
  /** Contents of the issue comment */
  body?: string;
  body_text?: string;
  body_html?: string;
  html_url: string;
  user: ISimpleUser | null;
  created_at: string;
  updated_at: string;
  issue_url: string;
  author_association:
    | 'COLLABORATOR'
    | 'CONTRIBUTOR'
    | 'FIRST_TIMER'
    | 'FIRST_TIME_CONTRIBUTOR'
    | 'MANNEQUIN'
    | 'MEMBER'
    | 'NONE'
    | 'OWNER';
  performed_via_github_app?: IIntegration | null;
  reactions?: {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    confused: number;
    heart: number;
    hooray: number;
    eyes: number;
    rocket: number;
  };
}

export interface IPullRequestReviewComment {
  /** URL for the pull request review comment */
  url: string;
  /** The ID of the pull request review to which the comment belongs. */
  pull_request_review_id: number | null;
  /** The ID of the pull request review comment. */
  id: number;
  /** The node ID of the pull request review comment. */
  node_id: string;
  /** The diff of the line that the comment refers to. */
  diff_hunk: string;
  /** The relative path of the file to which the comment applies. */
  path: string;
  /** The line index in the diff to which the comment applies. */
  position: number;
  /** The index of the original line in the diff to which the comment applies. */
  original_position: number;
  /** The SHA of the commit to which the comment applies. */
  commit_id: string;
  /** The SHA of the original commit to which the comment applies. */
  original_commit_id: string;
  /** The comment ID to reply to. */
  in_reply_to_id?: number;
  user: ISimpleUser;
  /** The text of the comment. */
  body: string;
  created_at: string;
  updated_at: string;
  /** HTML URL for the pull request review comment. */
  html_url: string;
  /** URL for the pull request that the review comment belongs to. */
  pull_request_url: string;
  author_association:
    | 'COLLABORATOR'
    | 'CONTRIBUTOR'
    | 'FIRST_TIMER'
    | 'FIRST_TIME_CONTRIBUTOR'
    | 'MANNEQUIN'
    | 'MEMBER'
    | 'NONE'
    | 'OWNER';
  _links: {
    self: {
      href: string;
    };
    html: {
      href: string;
    };
    pull_request: {
      href: string;
    };
  };
  /** The first line of the range for a multi-line comment. */
  start_line?: number | null;
  /** The first line of the range for a multi-line comment. */
  original_start_line?: number | null;
  /** The side of the first line of the range for a multi-line comment. */
  start_side?: ('LEFT' | 'RIGHT') | null;
  /** The line of the blob to which the comment applies. The last line of the range for a multi-line comment */
  line?: number;
  /** The line of the blob to which the comment applies. The last line of the range for a multi-line comment */
  original_line?: number;
  /** The side of the diff to which the comment applies. The side of the last line of the range for a multi-line comment */
  side?: 'LEFT' | 'RIGHT';
  reactions?: {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    confused: number;
    heart: number;
    hooray: number;
    eyes: number;
    rocket: number;
  };
  body_html?: string;
  body_text?: string;
}

export interface IDeployKey {
  id: number;
  key: string;
  url: string;
  title: string;
  verified: boolean;
  created_at: string;
  read_only: boolean;
}

export interface IDeployment {
  url: string;
  /** Unique identifier of the deployment */
  id: number;
  node_id: string;
  sha: string;
  /** The ref to deploy. This can be a branch, tag, or sha. */
  ref: string;
  /** Parameter to specify a task to execute */
  task: string;
  payload: { [key: string]: unknown } | string;
  original_environment?: string;
  /** Name for the target deployment environment. */
  environment: string;
  description: string | null;
  creator: ISimpleUser | null;
  created_at: string;
  updated_at: string;
  statuses_url: string;
  repository_url: string;
  /** Specifies if the given environment is will no longer exist at some point in the future. Default: false. */
  transient_environment?: boolean;
  /** Specifies if the given environment is one that end-users directly interact with. Default: false. */
  production_environment?: boolean;
  performed_via_github_app?: IIntegration | null;
}

export interface IDeploymentStatus {
  url: string;
  id: number;
  node_id: string;
  /** The state of the status. */
  state: 'error' | 'failure' | 'inactive' | 'pending' | 'success' | 'queued' | 'in_progress';
  creator: ISimpleUser | null;
  /** A short description of the status. */
  description: string;
  /** The environment of the deployment that the status is for. */
  environment?: string;
  /** Deprecated: the URL to associate with this status. */
  target_url: string;
  created_at: string;
  updated_at: string;
  deployment_url: string;
  repository_url: string;
  /** The URL for accessing your environment. */
  environment_url?: string;
  /** The URL to associate with this status. */
  log_url?: string;
  performed_via_github_app?: IIntegration | null;
}

export interface IMilestone {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  /** The number of the milestone. */
  number: number;
  /** The state of the milestone. */
  state: 'open' | 'closed';
  /** The title of the milestone. */
  title: string;
  description: string | null;
  creator: ISimpleUser | null;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  due_on: string | null;
}

export interface IIssue {
  id: number;
  node_id: string;
  /** URL for the issue */
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  /** Number uniquely identifying the issue within its repository */
  number: number;
  /** State of the issue; either 'open' or 'closed' */
  state: string;
  /** Title of the issue */
  title: string;
  /** Contents of the issue */
  body?: string | null;
  user: ISimpleUser | null;
  /** Labels to associate with this issue; pass one or more label names to replace the set of labels on this issue; send an empty array to clear all labels from the issue; note that the labels are silently dropped for users without push access to the repository */
  labels: (
    | string
    | {
        id?: number;
        node_id?: string;
        url?: string;
        name?: string;
        description?: string | null;
        color?: string | null;
        default?: boolean;
      }
  )[];
  assignee: ISimpleUser | null;
  assignees?: ISimpleUser[] | null;
  milestone: IMilestone;
  locked: boolean;
  active_lock_reason?: string | null;
  comments: number;
  pull_request?: {
    merged_at?: string | null;
    diff_url: string | null;
    html_url: string | null;
    patch_url: string | null;
    url: string | null;
  };
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  closed_by?: ISimpleUser | null;
  body_html?: string;
  body_text?: string;
  timeline_url?: string;
  repository?: IRepo;
  performed_via_github_app?: IIntegration | null;
  author_association:
    | 'COLLABORATOR'
    | 'CONTRIBUTOR'
    | 'FIRST_TIMER'
    | 'FIRST_TIME_CONTRIBUTOR'
    | 'MANNEQUIN'
    | 'MEMBER'
    | 'NONE'
    | 'OWNER';
  reactions?: {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    confused: number;
    heart: number;
    hooray: number;
    eyes: number;
    rocket: number;
  };
}

export interface ISimpleTeam {
  /** Unique identifier of the team */
  id: number;
  node_id: string;
  /** URL for the team */
  url: string;
  members_url: string;
  /** Name of the team */
  name: string;
  /** Description of the team */
  description: string | null;
  /** Permission that the team will have for its repositories */
  permission: string;
  /** The level of privacy this team should have */
  privacy?: string;
  html_url: string;
  repositories_url: string;
  slug: string;
  /** Distinguished Name (DN) that team maps to within LDAP environment */
  ldap_dn?: string;
}

export interface ITeam {
  id: number;
  node_id: string;
  name: string;
  slug: string;
  description: string | null;
  privacy?: string;
  permission: string;
  permissions?: {
    pull: boolean;
    triage: boolean;
    push: boolean;
    maintain: boolean;
    admin: boolean;
  };
  url: string;
  html_url: string;
  members_url: string;
  repositories_url: string;
  parent: ISimpleTeam | null;
}

export interface IHook {
  type: string;
  /** Unique identifier of the webhook. */
  id: number;
  /** The name of a valid service, use 'web' for a webhook. */
  name: string;
  /** Determines whether the hook is actually triggered on pushes. */
  active: boolean;
  /** Determines what events the hook is triggered for. Default: ['push']. */
  events: string[];
  config: {
    email?: string;
    password?: string;
    room?: string;
    subdomain?: string;
    url?: string;
    insecure_ssl?: string | number;
    content_type?: string;
    digest?: string;
    secret?: string;
    token?: string;
  };
  updated_at: string;
  created_at: string;
  url: string;
  test_url: string;
  ping_url: string;
  deliveries_url?: string;
  last_response: {
    code: number | null;
    status: string | null;
    message: string | null;
  };
}

export interface IOrgInvitation {
  id: number;
  login: string | null;
  email: string | null;
  role: string;
  created_at: string;
  failed_at?: string | null;
  failed_reason?: string | null;
  inviter: ISimpleUser;
  team_count: number;
  node_id: string;
  invitation_teams_url: string;
}

export interface IOrgSimple {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string | null;
}

export interface IOrgMembership {
  url: string;
  /** The state of the member in the organization. The `pending` state indicates the user has not yet accepted an invitation. */
  state: 'active' | 'pending';
  /** The user's membership type in the organization. */
  role: 'admin' | 'member' | 'billing_manager';
  organization_url: string;
  organization: IOrgSimple;
  user: ISimpleUser | null;
  permissions?: {
    can_create_repository: boolean;
  };
}

export interface IPageBuild {
  url: string;
  status: string;
  error: {
    message: string | null;
  };
  pusher: ISimpleUser | null;
  commit: string;
  duration: number;
  created_at: string;
  updated_at: string;
}

export interface IProjectColumn {
  url: string;
  project_url: string;
  cards_url: string;
  /** The unique identifier of the project column */
  id: number;
  node_id: string;
  /** Name of the project column */
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IProject {
  owner_url: string;
  url: string;
  html_url: string;
  columns_url: string;
  id: number;
  node_id: string;
  /** Name of the project */
  name: string;
  /** Body of the project */
  body: string | null;
  number: number;
  /** State of the project; either 'open' or 'closed' */
  state: string;
  creator: ISimpleUser | null;
  created_at: string;
  updated_at: string;
  /** The baseline permission that all organization members have on this project. Only present if owner is an organization. */
  organization_permission?: 'read' | 'write' | 'admin' | 'none';
  /** Whether or not this project can be seen by everyone. Only present if owner is an organization. */
  private?: boolean;
}

export interface IPullRequest {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  /** Number uniquely identifying the pull request within its repository. */
  number: number;
  /** State of this Pull Request. Either `open` or `closed`. */
  state: 'open' | 'closed';
  locked: boolean;
  /** The title of the pull request. */
  title: string;
  user: ISimpleUser | null;
  body: string | null;
  labels: {
    id?: number;
    node_id?: string;
    url?: string;
    name?: string;
    description?: string | null;
    color?: string;
    default?: boolean;
  }[];
  milestone: IMilestone | null;
  active_lock_reason?: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  merge_commit_sha: string | null;
  assignee: ISimpleUser | null;
  assignees?: ISimpleUser[] | null;
  requested_reviewers?: ISimpleUser[] | null;
  requested_teams?: ISimpleTeam[] | null;
  head: {
    label: string;
    ref: string;
    repo: {
      archive_url: string;
      assignees_url: string;
      blobs_url: string;
      branches_url: string;
      collaborators_url: string;
      comments_url: string;
      commits_url: string;
      compare_url: string;
      contents_url: string;
      contributors_url: string;
      deployments_url: string;
      description: string | null;
      downloads_url: string;
      events_url: string;
      fork: boolean;
      forks_url: string;
      full_name: string;
      git_commits_url: string;
      git_refs_url: string;
      git_tags_url: string;
      hooks_url: string;
      html_url: string;
      id: number;
      node_id: string;
      issue_comment_url: string;
      issue_events_url: string;
      issues_url: string;
      keys_url: string;
      labels_url: string;
      languages_url: string;
      merges_url: string;
      milestones_url: string;
      name: string;
      notifications_url: string;
      owner: {
        avatar_url: string;
        events_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        gravatar_id: string | null;
        html_url: string;
        id: number;
        node_id: string;
        login: string;
        organizations_url: string;
        received_events_url: string;
        repos_url: string;
        site_admin: boolean;
        starred_url: string;
        subscriptions_url: string;
        type: string;
        url: string;
      };
      private: boolean;
      pulls_url: string;
      releases_url: string;
      stargazers_url: string;
      statuses_url: string;
      subscribers_url: string;
      subscription_url: string;
      tags_url: string;
      teams_url: string;
      trees_url: string;
      url: string;
      clone_url: string;
      default_branch: string;
      forks: number;
      forks_count: number;
      git_url: string;
      has_downloads: boolean;
      has_issues: boolean;
      has_projects: boolean;
      has_wiki: boolean;
      has_pages: boolean;
      homepage: string | null;
      language: string | null;
      master_branch?: string;
      archived: boolean;
      disabled: boolean;
      /** The repository visibility: public, private, or internal. */
      visibility?: string;
      mirror_url: string | null;
      open_issues: number;
      open_issues_count: number;
      permissions?: {
        admin: boolean;
        maintain?: boolean;
        push: boolean;
        triage?: boolean;
        pull: boolean;
      };
      temp_clone_token?: string;
      allow_merge_commit?: boolean;
      allow_squash_merge?: boolean;
      allow_rebase_merge?: boolean;
      license: {
        key: string;
        name: string;
        url: string | null;
        spdx_id: string | null;
        node_id: string;
      } | null;
      pushed_at: string;
      size: number;
      ssh_url: string;
      stargazers_count: number;
      svn_url: string;
      topics?: string[];
      watchers: number;
      watchers_count: number;
      created_at: string;
      updated_at: string;
      allow_forking?: boolean;
      is_template?: boolean;
    } | null;
    sha: string;
    user: {
      avatar_url: string;
      events_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      gravatar_id: string | null;
      html_url: string;
      id: number;
      node_id: string;
      login: string;
      organizations_url: string;
      received_events_url: string;
      repos_url: string;
      site_admin: boolean;
      starred_url: string;
      subscriptions_url: string;
      type: string;
      url: string;
    };
  };
  base: {
    label: string;
    ref: string;
    repo: {
      archive_url: string;
      assignees_url: string;
      blobs_url: string;
      branches_url: string;
      collaborators_url: string;
      comments_url: string;
      commits_url: string;
      compare_url: string;
      contents_url: string;
      contributors_url: string;
      deployments_url: string;
      description: string | null;
      downloads_url: string;
      events_url: string;
      fork: boolean;
      forks_url: string;
      full_name: string;
      git_commits_url: string;
      git_refs_url: string;
      git_tags_url: string;
      hooks_url: string;
      html_url: string;
      id: number;
      is_template?: boolean;
      node_id: string;
      issue_comment_url: string;
      issue_events_url: string;
      issues_url: string;
      keys_url: string;
      labels_url: string;
      languages_url: string;
      merges_url: string;
      milestones_url: string;
      name: string;
      notifications_url: string;
      owner: {
        avatar_url: string;
        events_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        gravatar_id: string | null;
        html_url: string;
        id: number;
        node_id: string;
        login: string;
        organizations_url: string;
        received_events_url: string;
        repos_url: string;
        site_admin: boolean;
        starred_url: string;
        subscriptions_url: string;
        type: string;
        url: string;
      };
      private: boolean;
      pulls_url: string;
      releases_url: string;
      stargazers_url: string;
      statuses_url: string;
      subscribers_url: string;
      subscription_url: string;
      tags_url: string;
      teams_url: string;
      trees_url: string;
      url: string;
      clone_url: string;
      default_branch: string;
      forks: number;
      forks_count: number;
      git_url: string;
      has_downloads: boolean;
      has_issues: boolean;
      has_projects: boolean;
      has_wiki: boolean;
      has_pages: boolean;
      homepage: string | null;
      language: string | null;
      master_branch?: string;
      archived: boolean;
      disabled: boolean;
      /** The repository visibility: public, private, or internal. */
      visibility?: string;
      mirror_url: string | null;
      open_issues: number;
      open_issues_count: number;
      permissions?: {
        admin: boolean;
        maintain?: boolean;
        push: boolean;
        triage?: boolean;
        pull: boolean;
      };
      temp_clone_token?: string;
      allow_merge_commit?: boolean;
      allow_squash_merge?: boolean;
      allow_rebase_merge?: boolean;
      license: {
        key: string;
        name: string;
        url: string | null;
        spdx_id: string | null;
        node_id: string;
        html_url?: string;
      };
      pushed_at: string;
      size: number;
      ssh_url: string;
      stargazers_count: number;
      svn_url: string;
      topics?: string[];
      watchers: number;
      watchers_count: number;
      created_at: string;
      updated_at: string;
      allow_forking?: boolean;
    };
    sha: string;
    user: {
      avatar_url: string;
      events_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      gravatar_id: string | null;
      html_url: string;
      id: number;
      node_id: string;
      login: string;
      organizations_url: string;
      received_events_url: string;
      repos_url: string;
      site_admin: boolean;
      starred_url: string;
      subscriptions_url: string;
      type: string;
      url: string;
    };
  };
  _links: {
    comments: {
      href: string;
    };
    commits: {
      href: string;
    };
    statuses: {
      href: string;
    };
    html: {
      href: string;
    };
    issue: {
      href: string;
    };
    review_comments: {
      href: string;
    };
    review_comment: {
      href: string;
    };
    self: {
      href: string;
    };
  };
  author_association:
    | 'COLLABORATOR'
    | 'CONTRIBUTOR'
    | 'FIRST_TIMER'
    | 'FIRST_TIME_CONTRIBUTOR'
    | 'MANNEQUIN'
    | 'MEMBER'
    | 'NONE'
    | 'OWNER';
  auto_merge: {
    enabled_by: ISimpleUser;
    merge_method: 'merge' | 'squash' | 'rebase';
    commit_title: string;
    commit_message: string;
  };
  /** Indicates whether or not the pull request is a draft. */
  draft?: boolean;
  merged: boolean;
  mergeable: boolean | null;
  rebaseable?: boolean | null;
  mergeable_state: string;
  merged_by: ISimpleUser | null;
  comments: number;
  review_comments: number;
  /** Indicates whether maintainers can modify the pull request. */
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}

export interface IPullRequestReview {
  /** Unique identifier of the review */
  id: number;
  node_id: string;
  user: ISimpleUser | null;
  /** The text of the review. */
  body: string;
  state: string;
  html_url: string;
  pull_request_url: string;
  _links: {
    html: {
      href: string;
    };
    pull_request: {
      href: string;
    };
  };
  submitted_at?: string;
  /** A commit SHA for the review. */
  commit_id: string;
  body_html?: string;
  body_text?: string;
  author_association:
    | 'COLLABORATOR'
    | 'CONTRIBUTOR'
    | 'FIRST_TIMER'
    | 'FIRST_TIME_CONTRIBUTOR'
    | 'MANNEQUIN'
    | 'MEMBER'
    | 'NONE'
    | 'OWNER';
}

export interface IRelease {
  url: string;
  html_url: string;
  assets_url: string;
  upload_url: string;
  tarball_url: string | null;
  zipball_url: string | null;
  id: number;
  node_id: string;
  /** The name of the tag. */
  tag_name: string;
  /** Specifies the commitish value that determines where the Git tag is created from. */
  target_commitish: string;
  name: string | null;
  body?: string | null;
  /** true to create a draft (unpublished) release, false to create a published one. */
  draft: boolean;
  /** Whether to identify the release as a prerelease or a full release. */
  prerelease: boolean;
  created_at: string;
  published_at: string | null;
  author: ISimpleUser;
  assets: {
    url: string;
    browser_download_url: string;
    id: number;
    node_id: string;
    name: string;
    label: string | null;
    state: 'uploaded' | 'open';
    content_type: string;
    size: number;
    download_count: number;
    created_at: string;
    updated_at: string;
    uploader: ISimpleUser | null;
  }[];
  body_html?: string;
  body_text?: string;
  mentions_count?: number;
  /** The URL of the release discussion. */
  discussion_url?: string;
  reactions?: {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    confused: number;
    heart: number;
    hooray: number;
    eyes: number;
    rocket: number;
  };
}