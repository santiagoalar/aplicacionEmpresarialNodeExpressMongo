export default function buildMakeComment ({ Id, md5, sanitize, makeSource }) {
  return function makeComment ({
    author,
    createdOn = Date.now(),
    id = Id.makeId(),
    source,
    modifiedOn = Date.now(),
    postId,
    published = false,
    replyToId,
    text
  } = {}) {
    if (!Id.isValidId(id)) {
      //throw new Error('Comment must have a valid id.')
      throw new Error('El comentario debe tener un id válido.');
    }
    if (!author) {
      //throw new Error('Comment must have an author.')
      throw new Error('El comentario debe tener un autor.')
    }
    if (author.length < 2) {
      //throw new Error("Comment author's name must be longer than 2 characters.")
      throw new Error("El nombre del autor del comentario debe contener mas de 2 caracteres.");
    }
    if (!postId) {
      //throw new Error('Comment must contain a postId.')
      throw new Error('El comentario debe contener un postId.')
    }
    if (!text || text.length < 1) {
      //throw new Error('Comment must include at least one character of text.')
      throw new Error('El comentario debe incluir al mentos un caracter como texto.');
    }
    if (!source) {
      //throw new Error('Comment must have a source.')
      throw new Error('El comentario debe tener una fuente.');
    }
    if (replyToId && !Id.isValidId(replyToId)) {
      //throw new Error('If supplied. Comment must contain a valid replyToId.')
      throw new Error('Si es suministrado. El comentario deber contener un replyToId válido.');
    }

    let sanitizedText = sanitize(text).trim()
    if (sanitizedText.length < 1) {
      //throw new Error('Comment contains no usable text.')
      throw new Error('El comentario no coniene texto utilizable.')
    }

    const validSource = makeSource(source)
    //const deletedText = '.xX This comment has been deleted Xx.'
    const deletedText = '.xX Este comentario ha sido eliminado Xx.'
    let hash

    return Object.freeze({
      getAuthor: () => author,
      getCreatedOn: () => createdOn,
      getHash: () => hash || (hash = makeHash()),
      getId: () => id,
      getModifiedOn: () => modifiedOn,
      getPostId: () => postId,
      getReplyToId: () => replyToId,
      getSource: () => validSource,
      getText: () => sanitizedText,
      isDeleted: () => sanitizedText === deletedText,
      isPublished: () => published,
      markDeleted: () => {
        sanitizedText = deletedText
        author = 'eliminado'
      },
      publish: () => {
        published = true
      },
      unPublish: () => {
        published = false
      }
    })

    function makeHash () {
      return md5(
        sanitizedText +
          published +
          (author || '') +
          (postId || '') +
          (replyToId || '')
      )
    }
  }
}
