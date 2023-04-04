Hi everyone,

Here I would try to comment on my approach and what I have done and what I have not. Thanks for your time.

### Disclaimer

In the beginning, I would say that this is my first code test using Node, and it was hard, not the language or the use of Typescript, I think that was very cool; but the unknown part of how to implement some things, and the lack of experience with some libraries, or trying to find the right library or right way to solve the issues, make it tough.

### Introduction

The project structure follows clearly after Hexagonal Architecture, and DDD, so I tried to follow the principles. I tried also to commit every step, so the commit history is also useful to follow the way I worked.

### Solving Stage 1

 The validations for me should be inside some ValueObjects, so I just created different ValueObjects for the Genially entity, and try to centre everything in the Genially class.

 Also created some unit tests (for the [create Genially](/test/unit/contexts/core/genially/application/Create/CreateGEniallyService.test.ts) and the [rename](/test/unit/contexts/core/genially/application/Rename/RenameGeniallyService.test.ts) and [delete](/test/unit/contexts/core/genially/application/Delete/DeleteGeniallyService.test.ts) services) and acceptance tests (for the different [endpoints](/test/integration/api/controllers/genially.test.ts)).

 Using TDD in the different use cases, I managed to solve the validations and the different requirements of the first stage using the InMemoryDatabase. And added, of course, some integration tests to the [in-memory database implementation](/test/integration/contexts/core/genially/infrastructure/InMemoryGeniallyRepository.test.ts).

### Solving Stage 2

For persist data into Mongo, I just added Mongo to the docker-compose and created a new repository for Mongo using the same GeniallyRepository interface, so [MongoRepository](/src/contexts/core/genially/infrastructure/MongoGeniallyRepository.ts) and InMemoryRepository can be changed.

At this point, I was thinking to introduce dependency injection, but I was reading, trying to find the way to do it, and the best option, but after some time I discarded to invest a big amount of time trying to find and configure a library for DI because I thought the test was almost finished and even knowing I should use events later on in the project for the stage 3, I thought I could manage it.

> *Spoiler alert:* **I couldn´t.**

Finally, I added the correspondent [integration tests](/test/integration/contexts/core/genially/infrastructure/MongoGeniallyRepository.test.ts) for the Mongo repository.

### Solving Stage 3

For the last stage, I know since the first time I read the test README, that I want it to create another application in the Genially domain, to the count of the created geniallys. And communicate both of them using domain events. I don´t have any experience configuring by myself Kafka or RabbitMQ, so I tried to not use them at the beginning, looking online for InMemory solutions, I found one in the Codely repository that Genially made for a course, and tried to follow it.

The problem was, that I could generate events, without any issues, and also check them on the tests. But for the subscriber part, I couldn´t make it work, I tried to make a singleton-ish in the app for the event bus, but in the end, I have the same issue, and cannot subscribe to specific events, or at least I couldn´t find the way to do it in Node.

### Tests

I tried to approach the code test using TDD as much as I could. I created 3 types of test, unit tests for the 3 services that would use the aggregate Genially. Also in them, I tested the different input validations for the ValueObjects.

Also some acceptance tests for the API endpoints.

And finally some integration tests for the different Repository implementations.

To run unit tests just use ```npm run test:unit```

And to run integration/acceptance tests just use ```npm run test:integration```

### What I have left.

Well, as I wrote in stage 3, I have left to subscribe to the specific [GeniallyCreationEvent](src\contexts\core\genially\domain\GeniallyCreatedDomainEvent.ts), so when an event was received, the use case of [GeniallyCounter](src\contexts\core\counter\application\GeniallyIncreaseCounterService.ts) is executed and stores the counter value implementing the [repository](src\contexts\core\counter\domain\GeniallyCounterRepository.ts). I didn´t implement any repository, because at that point I found that I could not use it, so I stop it there, but again a repository that stores in a new Mongo collection would be simple to create.

Also, there is a test that fails occasionally, because of the creation date, but I didn´t find a way to fix it that I like enough.

#### Thanks for your time!

### Notes

PS: For future users, it would be nice an updated version of the repo, at least for the libraries, I expended a lot of time (at least 2-3 hours) with different issues, for problems between some libraries that I installed, and some of the old ones, getting different weird typescript errors, that was hard to solve, probably because I don't have enough experience with Node.