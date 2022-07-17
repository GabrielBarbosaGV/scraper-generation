import { JSDOM } from "jsdom";
// import { nodeArrayFromNodeIterator } from "./dom/nodes-from-iterator";
// import { obtainAllTextNodes } from "./dom/text-node-acquisition";
import { description } from "./description/description-generation";
// import unique from 'unique-selector';

const document = new JSDOM(`
    <!DOCTYPE html>
    <html>
        <body>
            <div>
                <p>
                    Yo! This is some text! It should be shortened, given its length. Let's see if the code will work that out.
                </p>
            </div>
            <div class="other">
                <a href="/other">Link</a>
            </div>
        </body>
    </html>
`).window.document;

const topics = 'Main content'.split(', ');

console.log(description({ topics, document }));

/*
const allTextNodes = obtainAllTextNodes({
    rootNode: document.getRootNode(),
    createNodeIterator: document.createNodeIterator.bind(document),
    nodeArrayFromNodeIterator
});

console.log(allTextNodes.map(node => unique(node.parentElement, { selectorTypes: ['ID', 'Tag', 'NthChild', 'Class'] })));
*/