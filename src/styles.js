var styles = [
  {
    "name":"part of speech",
    "markups": {
      "suggest":  {'border-bottom': '1px solid orange','cursor': 'pointer'},
      "comment":  {'border-bottom': '1px solid purple','cursor': 'pointer'},

      "revision":  {'border-bottom': '1px solid green','cursor': 'pointer'},
      "verb":  {"background-image":"url('svg/overline.svg')" },
      "verb_b":  {"background-image":"url('svg/overline_b.svg')" },
      "verb_e":  {"background-image":"url('svg/overline_e.svg')" },
      
      "suggests":  {
          'border-bottom': '3px solid red','cursor': 'pointer'
      },
      //"changes":  {"background-image":"url('svg/overline.svg')" },
      //"changes_b":  {"background-image":"url('svg/overline_b.svg')" },
      //"changes_e":  {"background-image":"url('svg/overline_e.svg')" },

      "noun":  {"background-image":"url('svg/yellowcircle.svg')"} ,
      "abstract" :  {"background-image":"url('svg/silvercircle.svg')"},
      "comma" :  {"background-image":"url('svg/comma.svg')"},
      "fullstop" :  {"background-image":"url('svg/fullstop.svg')"},
      "redstrikeout" :  {"background-image":"url('svg/redstrikeout.svg')"},
      "inserttext" : {"background-image": "url('svg/overline.svg')"},
      "linkto" : {"cursor": "pointer", "background-image": "url('svg/underline.svg')"},


    }
  }

];
module.exports=styles;