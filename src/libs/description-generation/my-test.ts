import { JSDOM } from "jsdom";
import { nodeArrayFromNodeIterator } from "./dom/nodes-from-iterator";
import { obtainAllTextNodes } from "./dom/text-node-acquisition";
// import { description } from "./description/description-generation";
import unique from 'unique-selector';

const document = new JSDOM(`
    <!DOCTYPE html>
    <html>
        <body>
            <div>
                <p>Yo! This is some text!</p>
            </div>
        </body>
    </html>
`).window.document;

// const topics = 'Main content'.split(', ');

// console.log(description({ topics, document }));

console.log(obtainAllTextNodes({
    rootNode: document.getRootNode(),
    createNodeIterator: document.createNodeIterator.bind(document),
    nodeArrayFromNodeIterator
}).map(node => unique(node as Element, { selctorTypes: ['NthChild', 'ID', 'Class', 'Tag'] })));