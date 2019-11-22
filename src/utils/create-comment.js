function createComment({
  parent, type, by, text,
}) {

  const comment = {};
  comment.parent = parent;
  comment.text = text;
  comment.by = by;
  comment.type = type;

  return comment;
}

module.exports = createComment;
