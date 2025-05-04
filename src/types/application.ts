export interface Application {
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
    finalizers?: string[];
    ownerReferences?: {
      apiVersion: string;
      kind: string;
      name: string;
      uid: string;
      controller?: boolean;
      blockOwnerDeletion?: boolean;
    }[];
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
  status?: {
    resources?: {
      group: string;
      kind: string;
      name: string;
      namespace: string;
      status: string;
      version: string;
      hook?: boolean;
      requiresPruning?: boolean;
    }[];
    sync?: {
      status: string;
      comparedTo?: {
        destination: {
          server?: string;
          namespace: string;
          name?: string;
        };
        source: {
          repoURL: string;
          targetRevision: string;
          path?: string;
          chart?: string;
        };
      };
      revision?: string;
    };
    health?: {
      status: string;
      message?: string;
    };
    history?: {
      revision: string;
      deployedAt: string;
      id: number;
      source: {
        repoURL: string;
        targetRevision: string;
        path?: string;
        chart?: string;
      };
    }[];
    operationState?: {
      operation: {
        sync: {
          revision: string;
          prune: boolean;
          dryRun: boolean;
          syncOptions: string[];
        };
        initiatedBy: {
          username: string;
          automated: boolean;
        };
      };
      phase: string;
      message: string;
      syncResult?: {
        resources: {
          group: string;
          kind: string;
          name: string;
          namespace: string;
          status: string;
          version: string;
          hookPhase?: string;
          hookType?: string;
          message?: string;
          syncPhase: string;
        }[];
        revision: string;
        source: {
          repoURL: string;
          targetRevision: string;
          path?: string;
          chart?: string;
        };
      };
      startedAt: string;
      finishedAt?: string;
    };
    reconciledAt: string;
    sourceType: string;
    summary: {
      images?: string[];
      externalURLs?: string[];
    };
    conditions?: {
      type: string;
      status: string;
      message: string;
      lastTransitionTime: string;
    }[];
  };
}