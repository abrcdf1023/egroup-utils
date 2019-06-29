import { ContentState, EditorState, convertFromRaw } from 'draft-js';

export default function getEditorState(rawEditorState, plainText) {
  let contentState;
  if (!rawEditorState && plainText) {
    contentState = ContentState.createFromText(plainText);
  } else if (rawEditorState) {
    contentState = convertFromRaw(JSON.parse(rawEditorState));
  }
  if (contentState) {
    return EditorState.createWithContent(contentState);
  }
  return EditorState.createEmpty();
}
