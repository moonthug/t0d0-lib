# `@moonthug/trello`

> WARNING

At present, this client relies on a local Redis server running by default


The client interface attempts to map to the Trello API as tightly as possible, providing two methods per API resource.

i.e. Cards


API: `GET https://api.trello.com/1/cards/{id}`

Client: `trello.getCard(id)`

API: `GET https://api.trello.com/1/cards/{id}/{field}`

Client: `trello.getCardField(id, field)`


## Usage

```js
import Trello from '@moonthug/trello';

const trello = new Trello(API_KEY, API_SECRET);
```

To disable the cache

```js
import Trello from '@moonthug/trello';

const trello = new Trello(API_KEY, API_SECRET, { 
  httpOptions: {
    cache: {
     enabled: false,
   }
  }
});
```

To configure the cache (see `../packagegs/http-cache`)

```js
import Trello from '@moonthug/trello';

const trello = new Trello(API_KEY, API_SECRET, { 
  // Defaults
  httpOptions: {
    cache: {
      // Cache
      enabled: true,
      ns: 'httpcache',
      ttl: 60 * 15,

      // Redis
      port: 6379,
      host: '127.0.0.1',
      db: 0
    }
  }
});

```

### Examples

Get all the boards for a username

```js
const usersBoards = await this.trello.getMemberField('username', 'boards');
```


Get a card by board ID

```js
const cards = await this.trello.getBoardField(boardId, 'cards');
```
