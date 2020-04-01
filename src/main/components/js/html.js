// Difficulty: "Hurt me plenty"
// Language definition for HTML
// This definition uses states extensively to
// - match up tags.
// - and to embed scripts dynamically
// See also the documentation for an explanation of these techniques
export default {
    defaultToken: '',
    tokenPostfix: '.html',
    ignoreCase: true,

    // The main tokenizer for our languages
    tokenizer: {
        root: [
            [/<!DOCTYPE/, 'metatag', '@doctype'],
            [/<!--/, 'comment', '@comment'],
            [/(<)((?:[\w\-]+:)?[\w\-]+)(\s*)(\/>)/, ['delimiter', 'tag', '', 'delimiter']],
            [/(<)(script)/, ['delimiter', {token: 'tag', next: '@script'}]],
            [/(<)(style)/, ['delimiter', {token: 'tag', next: '@style'}]],
            [/(<)((?:[\w\-]+:)?[\w\-]+)/, ['delimiter', {token: 'tag', next: '@otherTag'}]],
            [/(<\/)((?:[\w\-]+:)?[\w\-]+)/, ['delimiter', {token: 'tag', next: '@otherTag'}]],
            [/</, 'delimiter'],
            [/[^<]+/], // text
        ],

        doctype: [
            [/[^>]+/, 'metatag.content'],
            [/>/, 'metatag', '@pop'],
        ],

        comment: [
            [/-->/, 'comment', '@pop'],
            [/[^-]+/, 'comment.content'],
            [/./, 'comment.content']
        ],

        otherTag: [
            [/\/?>/, 'delimiter', '@pop'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/], // whitespace
        ],

        // -- BEGIN <script> tags handling

        // After <script
        script: [
            [/type/, 'attribute.name', '@scriptAfterType'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/>/, {token: 'delimiter', next: '@scriptEmbedded', nextEmbedded: 'text/javascript'}],
            [/[ \t\r\n]+/], // whitespace
            [/(<\/)(script\s*)(>)/, ['delimiter', 'tag', {token: 'delimiter', next: '@pop'}]]
        ],

        // After <script ... type
        scriptAfterType: [
            [/=/, 'delimiter', '@scriptAfterTypeEquals'],
            [/>/, {token: 'delimiter', next: '@scriptEmbedded', nextEmbedded: 'text/javascript'}], // cover invalid e.g. <script type>
            [/[ \t\r\n]+/], // whitespace
            [/<\/script\s*>/, {token: '@rematch', next: '@pop'}]
        ],

        // After <script ... type =
        scriptAfterTypeEquals: [
            [/"([^"]*)"/, {token: 'attribute.value', switchTo: '@scriptWithCustomType.$1'}],
            [/'([^']*)'/, {token: 'attribute.value', switchTo: '@scriptWithCustomType.$1'}],
            [/>/, {token: 'delimiter', next: '@scriptEmbedded', nextEmbedded: 'text/javascript'}], // cover invalid e.g. <script type=>
            [/[ \t\r\n]+/], // whitespace
            [/<\/script\s*>/, {token: '@rematch', next: '@pop'}]
        ],

        // After <script ... type = $S2
        scriptWithCustomType: [
            [/>/, {token: 'delimiter', next: '@scriptEmbedded.$S2', nextEmbedded: '$S2'}],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/], // whitespace
            [/<\/script\s*>/, {token: '@rematch', next: '@pop'}]
        ],

        scriptEmbedded: [
            [/<\/script/, {token: '@rematch', next: '@pop', nextEmbedded: '@pop'}],
            [/[^<]+/, '']
        ],

        // -- END <script> tags handling


        // -- BEGIN <style> tags handling

        // After <style
        style: [
            [/type/, 'attribute.name', '@styleAfterType'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/>/, {token: 'delimiter', next: '@styleEmbedded', nextEmbedded: 'text/css'}],
            [/[ \t\r\n]+/], // whitespace
            [/(<\/)(style\s*)(>)/, ['delimiter', 'tag', {token: 'delimiter', next: '@pop'}]]
        ],

        // After <style ... type
        styleAfterType: [
            [/=/, 'delimiter', '@styleAfterTypeEquals'],
            [/>/, {token: 'delimiter', next: '@styleEmbedded', nextEmbedded: 'text/css'}], // cover invalid e.g. <style type>
            [/[ \t\r\n]+/], // whitespace
            [/<\/style\s*>/, {token: '@rematch', next: '@pop'}]
        ],

        // After <style ... type =
        styleAfterTypeEquals: [
            [/"([^"]*)"/, {token: 'attribute.value', switchTo: '@styleWithCustomType.$1'}],
            [/'([^']*)'/, {token: 'attribute.value', switchTo: '@styleWithCustomType.$1'}],
            [/>/, {token: 'delimiter', next: '@styleEmbedded', nextEmbedded: 'text/css'}], // cover invalid e.g. <style type=>
            [/[ \t\r\n]+/], // whitespace
            [/<\/style\s*>/, {token: '@rematch', next: '@pop'}]
        ],

        // After <style ... type = $S2
        styleWithCustomType: [
            [/>/, {token: 'delimiter', next: '@styleEmbedded.$S2', nextEmbedded: '$S2'}],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/], // whitespace
            [/<\/style\s*>/, {token: '@rematch', next: '@pop'}]
        ],

        styleEmbedded: [
            [/<\/style/, {token: '@rematch', next: '@pop', nextEmbedded: '@pop'}],
            [/[^<]+/, '']
        ],

        // -- END <style> tags handling
    },
};
