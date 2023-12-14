import { call, put, select } from "redux-saga/effects";
import { postApi } from "../../../apis";
import { postActions } from "../../actions";
import { postConsts } from "../../constants";

function* getListPostWorker(action: any): Generator<any, any, any> {
  try {
    const inforListPost = yield call(postApi.getListPostData, action.payload);
    yield put(postActions.getListPostActionSuccess(inforListPost));
  } catch (error) {
    yield put(postActions.getListPostActionFail(error));
  }
}
function* getCommentInPostWorker(action: any): Generator<any, any, any> {
  try {
    const state = yield select();
    const arrComment = state.postStates.commentsData;
    const id = action.payload._id;
    const hasOb1Value = arrComment.some((item: any) => item.post == id);
    if (hasOb1Value) {
      yield put({ type: postConsts.DEFAULT });
    } else {
      const inforCommentInPost = yield call(
        postApi.getCommentsInPostData,
        action.payload
      );
      yield put(postActions.getCommentsInPostActionSuccess(inforCommentInPost));
    }
  } catch (error) {
    yield put(postActions.getCommentsInPostActionFail(error));
  }
}
function* searchPostWorker(action: any): Generator<any, any, any> {
  try {
    const inforSearchPost = yield call(postApi.searchPostData, action.payload);
    yield put(postActions.searchPostActionSuccess(inforSearchPost));
  } catch (error) {
    yield put(postActions.searchPostActionFail(error));
  }
}

export { getListPostWorker, getCommentInPostWorker, searchPostWorker };