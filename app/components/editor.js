import Component from '@ember/component';

export default Component.extend({
  willDestroyElement() {
    this.summernote.destroy();
    this._super(...arguments);
  },
  
  didInsertElement() {
    const summernote = this.createSummernote();
    this.set('summernote', summernote);
    // set the editor not to query it in 
    const editor = this.element.querySelector('.note-editable');
    this.set('editor', editor);
    $(this.summernote).summernote('code', this.text);
  },

  onSummernoteChange() {
    // this is the desired height,
    // but component height is changed automatically by CSS,
    // so we dont need to set it
    const height = this.editor.scrollHeight;
    this.set('height', `${height}px`);
  },

  createSummernote() {
    // TODO: summernote requires jQuery :(
    const editor = this.element.querySelector('.value-blue-editor');
    return $(editor).summernote({
      placeholder: 'Please insert some text...',
      tabsize: 2,
      callbacks:{
        onChange: this.onSummernoteChange.bind(this)
      }
    });
  }
});
