import { DataSource } from "../data-source";
import { Context as GraphQLContext } from "../../context";
import { Passport } from "../../../domain/contexts/iam/passport";
import { CognitiveSearchDomain } from '../../../domain/infrastructure/cognitive-search/interfaces';

export class CognitiveSearchDataSource<Context extends GraphQLContext> extends DataSource<Context> {

  public get context(): Context {
    return this._context;
  }

  public async withSearch(func: (passport: Passport, search: CognitiveSearchDomain) => Promise<void>): Promise<void> {
    let passport = this._context.passport; 
    let cognitiveSearch = this._context.services.cognitiveSearch;
    await func(passport, cognitiveSearch);
  }
}
