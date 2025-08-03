// src/app/services/project-service.ts
import { inject, Injectable } from '@angular/core';
import { gql } from '@apollo/client';
import { Apollo, QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface ProjectType {
  id: string;
  name: string;
  description: string;
  releaseDate: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly apollo: Apollo = inject(Apollo);

  public getProjects(): Observable<ProjectType[]> {
    return this.apollo
      .watchQuery<{ projects: ProjectType[] }>({
        query: gql`
          query {
            projects {
              id
              name
              description
              releaseDate
            }
          }
        `,
      })
      .valueChanges.pipe(map((result) => result.data.projects));
  }
}
