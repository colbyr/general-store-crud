import { makeActionTypes } from './ActionTypes';
import {
  makeCreateAction,
  makeReadAction,
  makeUpdateAction,
  makeDeleteAction,
} from './Actions';

module.exports = {
  makeCRUDActionTypes: makeActionTypes,
  makeCreateAction,
  makeReadAction,
  makeUpdateAction,
  makeDeleteAction,
};
