import makeFakeComment from '../../__test__/fixtures/comment'
import makeComment from './'
//describe('comment', () => {
describe('El comentario', () => {
  //it('must have an author', () => {
  it('debe contener un autor', () => {
    const comment = makeFakeComment({ author: null })
    //expect(() => makeComment(comment)).toThrow('Comment must have an author.')
    expect(() => makeComment(comment)).toThrow('El comentario debe tener un autor.');
  })

  //it('must have a valid post id', () => {
  it('debe contener un post id válido', () => {
    const comment = makeFakeComment({ postId: null })
    //expect(() => makeComment(comment)).toThrow('Comment must contain a postId.')
    expect(() => makeComment(comment)).toThrow('El comentario debe contener un postId.');
  })
  //it('must have valid text', () => {
  it('debe contener un texto válido', () => {
    const comment = makeFakeComment({ text: null })
    //expect(() => makeComment(comment)).toThrow('Comment must include at least one character of text.')
    expect(() => makeComment(comment)).toThrow('El comentario debe incluir al mentos un caracter como texto.');
  })
  //it('can be in reply to another comment', () => {
  it('puede se en respuesta a otro comentario', () => {
    /*const comment = makeFakeComment({ replyToId: 'invalid' })
    expect(() => makeComment(comment)).toThrow(
      'If supplied. Comment must contain a valid replyToId.'
    )*/
    const comment = makeFakeComment({ replyToId: 'invalido' })
    expect(() => makeComment(comment)).toThrow(
      'Si es suministrado. El comentario deber contener un replyToId válido.'
    )
    const notInReply = makeFakeComment({ replyToId: undefined })
    expect(() => makeComment(notInReply)).not.toThrow()
  })
  //it('can have an id', () => {
  it('puede tener un id', () => {
    //const comment = makeFakeComment({ id: 'invalid' })
    const comment = makeFakeComment({ id: 'invalido' })
    //expect(() => makeComment(comment)).toThrow('Comment must have a valid id.');
    expect(() => makeComment(comment)).toThrow('El comentario debe tener un id válido.');
    const noId = makeFakeComment({ id: undefined })
    expect(() => makeComment(noId)).not.toThrow()
  })
  //it('can create an id', () => {
  it('puede crear un id', () => {
    const noId = makeFakeComment({ id: undefined })
    const comment = makeComment(noId)
    expect(comment.getId()).toBeDefined()
  })
  //it('can be published', () => {
  it('puede ser publicado', () => {
    const unpublished = makeFakeComment({ published: false })
    const comment = makeComment(unpublished)
    expect(comment.isPublished()).toBe(false)
    comment.publish()
    expect(comment.isPublished()).toBe(true)
  })
  //it('can be unpublished', () => {
  it('puede ser despublicado', () => {
    const unpublished = makeFakeComment({ published: true })
    const comment = makeComment(unpublished)
    expect(comment.isPublished()).toBe(true)
    comment.unPublish()
    expect(comment.isPublished()).toBe(false)
  })
  //it('is createdOn now in UTC', () => {
  it('es crearEncendido en UTC ahora', () => {
    const noCreationDate = makeFakeComment({ createdOn: undefined })
    expect(noCreationDate.createdOn).not.toBeDefined()
    const d = makeComment(noCreationDate).getCreatedOn()
    expect(d).toBeDefined()
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT')
  })
  //it('is modifiedOn now in UTC', () => {
  it('es modificadoEncendido ahora', () => {
    const noModifiedOnDate = makeFakeComment({ modifiedOn: undefined })
    expect(noModifiedOnDate.modifiedOn).not.toBeDefined()
    const d = makeComment(noModifiedOnDate).getCreatedOn()
    expect(d).toBeDefined()
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT')
  })
  //it('sanitizes its text', () => {
  it('desinfecta su texto', () => {
    const sane = makeComment({
      //...makeFakeComment({ text: '<p>This is fine</p>' })
      ...makeFakeComment({ text: '<p>Está bien</p>' })
    })
    const insane = makeComment({
      ...makeFakeComment({
        //text: '<script>This is not so fine</script><p>but this is ok</p>'
        text: '<script>Esto no está muy bien</script><p>pero está pasable</p>'
      })
    })
    const totallyInsane = makeFakeComment({
      //text: '<script>All your base are belong to us!</script>'
      text: '<script>Toda tu base nos pertenece!</script>'
    })

    //expect(sane.getText()).toBe('<p>This is fine</p>')
    //expect(insane.getText()).toBe('<p>but this is ok</p>')
    expect(sane.getText()).toBe('<p>Está bien</p>')
    expect(insane.getText()).toBe('<p>pero está pasable</p>')
    /*expect(() => makeComment(totallyInsane)).toThrow(
      'Comment contains no usable text.'
    )*/
    expect(() => makeComment(totallyInsane)).toThrow(
      'El comentario no coniene texto utilizable.'
    )
  })
  //it('can be marked deleted', () => {
  it('puede ser marcado como eliminado', () => {
    const fake = makeFakeComment()
    const c = makeComment(fake)
    c.markDeleted()
    expect(c.isDeleted()).toBe(true)
    /*expect(c.getText()).toBe('.xX This comment has been deleted Xx.')
    expect(c.getAuthor()).toBe('deleted')*/
    expect(c.getText()).toBe('.xX Este comentario ha sido eliminado Xx.') // *****************
    expect(c.getAuthor()).toBe('eliminado');
  })
  //it('includes a hash', () => {
  it('incluye un hash', () => {
    const fakeComment = {
      author: 'Bruce Wayne',
      text: "I'm batman.",
      postId: 'cjt65art5350vy000hm1rp3s9',
      published: true,
      source: { ip: '127.0.0.1' }
    }
    // md5 from: http://www.miraclesalad.com/webtools/md5.php
    expect(makeComment(fakeComment).getHash()).toBe(
      '7bb94f070d9305976b5381b7d3e8ad8a'
    )
  })
  //it('must have a source', () => {
  it('debe contener una fuente', () => {
    const noSource = makeFakeComment({ source: undefined })
    //expect(() => makeComment(noSource)).toThrow('Comment must have a source.')
    expect(() => makeComment(noSource)).toThrow('El comentario debe tener una fuente.')
  })
  //it('must have a source ip', () => {
  it('debe tener una ip de origen', () => {
    const noIp = makeFakeComment({ source: { ip: undefined } })
    /*expect(() => makeComment(noIp)).toThrow(
      'Comment source must contain an IP.'
    )*/
    expect(() => makeComment(noIp)).toThrow(
      'La fuente del comentario debe contener una ip.'
    )
  })
  //it('can have a source browser', () => {
  it('puede tener un navegador de origen', () => {
    const withBrowser = makeFakeComment()
    expect(
      makeComment(withBrowser)
        .getSource()
        .getBrowser()
    ).toBe(withBrowser.source.browser)
  })
  //it('can have a source referrer', () => {
  it('puede tener un fuente de referencia', () => {
    const withRef = makeFakeComment()
    expect(
      makeComment(withRef)
        .getSource()
        .getReferrer()
    ).toBe(withRef.source.referrer)
  })
})
