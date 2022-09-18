import { config } from 'dotenv';
import { JSDOM } from 'jsdom';
import { completer } from './ai/fetched-completion';
import { description } from './description/description-generation';

config();

const document = new JSDOM(/* html */`
    <body>
        <h1>How to care for a cat</h1>
        <div>
            <ul>
                <li>
                    Cleaning
                </li>
                <li>
                    Feeding
                </li>
                <li>
                    Playing
                </li>
            </ul>

            <div>
                <p>
                    To take care of a cat, multiple daily actions are required.
                </p>
            </div>
        </div>
    </body>
`).window.document;

const toComplete = description({
    topics: [
        'Title',
        'Topics',
        'Main content'
    ],
    document
})

console.log(toComplete);

const completion = completer();

completion.for(toComplete).then(console.log);