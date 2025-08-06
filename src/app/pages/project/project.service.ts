// src/app/services/project-service.ts
import { inject, Injectable } from '@angular/core';
import { gql } from '@apollo/client';
import { Apollo } from 'apollo-angular';
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
                `
            })
            .valueChanges.pipe(map((result) => result.data.projects));
    }

    public getProjectById(id: string): Observable<ProjectType | null> {
        return this.apollo
        .watchQuery<{ projectById: ProjectType }>({
            query: gql`
                query ($id: String!) {
                    projectById(id: $id) {
                        id
                        name
                        description
                    }
                }
            `,
            variables: { id }
        })
        .valueChanges.pipe(map((result) => result.data?.projectById ?? null));
    }

    public upsertProject(name: string, description: string): Observable<boolean> {
        return this.apollo
            .mutate<{ upsertProject: { id: string } }>({
                mutation: gql`
                    mutation MyMutation($input: UpsertProjectInput!) {
                        upsertProject(input: $input) {
                            id
                        }
                    }
                `,
                variables: { input: { name, description } } // Use dynamic input
            })
            .pipe(map((result) => !!result.data?.upsertProject?.id));
    }

    public deleteProject(id: string): Observable<boolean> {
        return this.apollo
            .mutate<{ deleteProject: boolean }>({
                mutation: gql`
                    mutation DeleteProject($id: ID!) {
                        deleteProject(id: $id)
                    }
                `,
                variables: { id }
            })
            .pipe(map((result) => result.data?.deleteProject ?? false));
    }
}
