import { createContext, ReactNode, useContext, useState } from 'react';
import { IssueSource } from '../../domain/repositories/IssueSource';
import { RepositorySource } from '../../domain/repositories/RepositorySource';
import { githubIssueSource } from '../datasources/github/githubIssueSource';
import { githubRepositorySource } from '../datasources/github/githubRepositorySource';
import { gitlabIssueSource } from '../datasources/gitlab/gitlabIssueSource';
import { gitlabRepositorySource } from '../datasources/gitlab/gitlabRepositorySource';

export type SourceName = 'github' | 'gitlab';

const repositorySources: Record<SourceName, RepositorySource> = {
  github: githubRepositorySource,
  gitlab: gitlabRepositorySource,
};

const issueSources: Record<SourceName, IssueSource> = {
  github: githubIssueSource,
  gitlab: gitlabIssueSource,
};

interface DataSourceContextValue {
  sourceName: SourceName;
  setSourceName: (source: SourceName) => void;
}

const DataSourceContext = createContext<DataSourceContextValue | null>(null);

export function DataSourceProvider({ children }: { children: ReactNode }) {
  const [sourceName, setSourceName] = useState<SourceName>('github');

  return (
    <DataSourceContext.Provider value={{ sourceName, setSourceName }}>
      {children}
    </DataSourceContext.Provider>
  );
}

export function useDataSource() {
  const context = useContext(DataSourceContext);
  if (!context) {
    throw new Error('useDataSource precisa estar dentro de um DataSourceProvider');
  }
  return context;
}

export function useRepositorySource(): RepositorySource {
  const { sourceName } = useDataSource();
  return repositorySources[sourceName];
}

export function useIssueSource(): IssueSource {
  const { sourceName } = useDataSource();
  return issueSources[sourceName];
}
