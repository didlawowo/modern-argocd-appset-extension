export interface ApplicationSet {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
    resourceVersion: string;
    uid: string;
    creationTimestamp: string;
    generation: number;
    annotations?: Record<string, string>;
    labels?: Record<string, string>;
  };
  spec: {
    generators: Generator[];
    template: ApplicationTemplate;
    syncPolicy?: SyncPolicy;
  };
  status?: {
    conditions?: Condition[];
  };
}

export interface Generator {
  clusterDecisionResource?: {
    configMapRef: string;
    labelSelector: {
      matchLabels: Record<string, string>;
    };
    requeueAfterSeconds?: number;
  };
  clusters?: {
    selector?: {
      matchLabels?: Record<string, string>;
      matchExpressions?: {
        key: string;
        operator: string;
        values: string[];
      }[];
    };
    values?: {
      [key: string]: string;
    };
  };
  git?: {
    repoURL: string;
    revision: string;
    directories?: {
      path: string;
      exclude?: boolean;
    }[];
    files?: {
      path: string;
      exclude?: boolean;
    }[];
  };
  list?: {
    elements: any[];
  };
  matrix?: {
    generators: Generator[];
  };
  merge?: {
    generators: Generator[];
    mergeKeys: string[];
  };
  scmProvider?: {
    github?: {
      organization: string;
      api: string;
      tokenRef?: {
        secretName: string;
        key: string;
      };
    };
    gitlab?: {
      group: string;
      api: string;
      tokenRef?: {
        secretName: string;
        key: string;
      };
    };
    bitbucket?: {
      owner: string;
      api: string;
      tokenRef?: {
        secretName: string;
        key: string;
      };
    };
    cloneProtocol?: string;
    filters?: {
      repositoryMatch?: string;
      pathsExist?: string[];
      labelMatch?: string;
      branchMatch?: string;
    };
  };
}

export interface ApplicationTemplate {
  metadata: {
    name: string;
    namespace?: string;
    annotations?: Record<string, string>;
    labels?: Record<string, string>;
    finalizers?: string[];
  };
  spec: {
    project: string;
    source: {
      repoURL: string;
      targetRevision: string;
      path?: string;
      chart?: string;
      helm?: {
        parameters?: {
          name: string;
          value: string;
        }[];
        values?: string;
        valuesFiles?: string[];
        releaseName?: string;
        fileParameters?: {
          name: string;
          path: string;
        }[];
      };
      kustomize?: {
        namePrefix?: string;
        nameSuffix?: string;
        images?: string[];
        commonLabels?: Record<string, string>;
        commonAnnotations?: Record<string, string>;
        version?: string;
      };
    };
    destination: {
      server?: string;
      namespace: string;
      name?: string;
    };
    syncPolicy?: {
      automated?: {
        prune?: boolean;
        selfHeal?: boolean;
        allowEmpty?: boolean;
      };
      syncOptions?: string[];
      retry?: {
        limit?: number;
        backoff?: {
          duration?: string;
          factor?: number;
          maxDuration?: string;
        };
      };
    };
    ignoreDifferences?: {
      group?: string;
      kind: string;
      name?: string;
      namespace?: string;
      jsonPointers?: string[];
      jqPathExpressions?: string[];
    }[];
  };
}

export interface SyncPolicy {
  preserveResourcesOnDeletion?: boolean;
  applicationsSync?: ApplicationsSyncPolicy;
}

export interface ApplicationsSyncPolicy {
  type: 'RollingSync';
  rollingSync: {
    steps: {
      matchExpressions: {
        key: string;
        operator: string;
        values: string[];
      }[];
      maxUpdate?: string | number;
    }[];
  };
}

export interface Condition {
  type: string;
  status: string;
  message: string;
  lastTransitionTime: string;
  reason: string;
}