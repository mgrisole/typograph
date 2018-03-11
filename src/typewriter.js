// (function(root, factory) {
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define([], factory);
//   } else if (typeof module === 'object' && module.exports) {
//     // Node. Does not work with strict CommonJS, but
//     // only CommonJS-like environments that support module.exports,
//     // like Node.
//     module.exports = factory();
//   } else {
//     // Browser globals (root is window)
//     root.typewriter = factory();
//   }
// }(this, () => {
//
//   function typeit($el, text, speed){
//     var schedule = ( function f(){
//       setTimeout( () => {
//         if( text.length ){
//           $el[0].childNodes[0].replaceWith( $el[0].childNodes[0].wholeText + text.shift() );
//           schedule();
//         } else {
//           $el.find('.typeme-cursor').addClass('finished');
//         }
//       }, ( / /.test(text[0]) ) ? 0 : speed + Math.floor(Math.random() * Math.floor(40) ));
//
//       return f;
//     })();
//   }
//
//   function typewriter( params ){
//     let t = params.speed;
//     let $el = params.el;
//     let cursor = params.cursor;
//
//     if( params.fixePosition ){
//
//       $el
//         .css('visibility','hidden')
//         .text( params.text.join('') + ( cursor || '' ) )
//         .css({
//           'width': $el.width(),
//           'height': $el.height()
//         })
//         .text('')
//         .css('visibility','visible')
//       ;
//     }
//
//     $el.text(' ');
//     if( cursor ){
//       let cursorStyle = `
//         <style type="text/css" class="typeme cursor">
//
//           @keyframes blink {
//             0% {
//               opacity: 1 }
//             50% {
//               opacity: 0 }
//             100% {
//               opacity: 1 }
//           }
//
//           .typeme-cursor.finished {
//             opacity: 1;
//             animation: blink .7s infinite;
//           }
//         </style>`;
//       $('head').append(cursorStyle);
//       $el.append('<span class="typeme-cursor">' + cursor + '</span>')
//     }
//
//     typeit($el, params.text, params.speed);
//   }
//
//   typewriter.version = '1.0.0';
//
// return typewriter;
//
// }));

export default class Typewriter {

  constructor(params) {
    this.target = params.target;
    this.cursor = params.cursor;
    this.speed = params.speed;
    this.fixePosition = params.fixePosition;
    this.text = params.text || '';
    this.writingSequences = this.setText();

    this.typeit();
  }

  setText(){
    return Array.prototype.map.call( document.querySelectorAll( this.target ), e => {
      return {
        target: e,
        text: [...e.dataset.typeit] || [...this.text]
      };
    });
  }

  typeit(){

    // function typeLetter() {
    //   setTimeout( () => {
    //     var t = sequence.target.appendChild( document.createTextNode('test') );
    //     if( sequence.text.length ){
    //       sequence.target[0].childNodes[0].replaceWith( sequence.target[0].childNodes[0].wholeText + sequence.text.shift() );
    //       this.typeit();
    //     } else {
    //       // sequence.target.find('.typeme-cursor').addClass('finished');
    //     }
    //   }, ( / /.test(sequence.text[0]) ) ? 0 : this.speed + Math.floor(Math.random() * Math.floor(40) ) );
    // }

    let typeLetters = ( text, textNode ) => {
      setTimeout( () => {
        if( text.length ) {
          textNode.nodeValue = textNode.wholeText + text.shift();
          typeLetters( text, textNode );
        }
      }, ( / /.test(text[0]) ) ? 0 : this.speed + Math.floor(Math.random() * Math.floor(40) ) );
    }

    this.writingSequences.forEach( sequence => {
      let textNode = sequence.target.appendChild( document.createTextNode('') );
      typeLetters( sequence.text, textNode );
    });
  }
}