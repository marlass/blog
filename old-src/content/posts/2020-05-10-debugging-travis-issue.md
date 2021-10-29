---
layout: post
title: Debugging Travis issue
date: 2020-05-10
path: /debugging-travis-issue
---

This is a story that happened to me recently and I wanted to share how I approach debugging problems and what is my thought process. I found this particular issue worth describing, because as usual the most interesting problems are made of smaller problems combined together that you might have never discover otherwise. Enjoy the journey.

<!--more-->

Before I go to the real issue let me shortly describe the project background. More than 20 people regularly commit code to the project. To maintain quality of the code we require that each PR passes all required checks. In our case all unit tests have to pass, critical e2e tests are passing and linter doesn't catch any errors. Additionally we commit to 2 main branches. One branch for stable version maintenance and the other for next version development. Recently we worked on major release, so we have a lot of differences between those branches that will play a role in this story.

The story starts with this image
![Failing Travis job for latest commit](debugging-travis-issue/commits.JPG)

Suddenly Travis job failed for the change that shouldn't break anything. It was only the library version bump in maintenance branch. Everything should be okay.

Let's see what failed in this job.

- ✓ Linter passed
- ✓ Prettier passed
- ✓ Unit tests for core library passed

Aha. Unit tests for storefront library failed.

Let's look at the details
![Failing unit test in storefront library](debugging-travis-issue/unit-tests.JPG)

Ok. Only one unit test failing. I'll just checkout to this branch and run the tests locally.

Few moments later... What! All tests green. Not a single failure! Wtf

Let me just check the changes in the last commit once again. Maybe I messed up the last commit.

Hmmm. It looks alright. Maybe that was random Travis failure. Maybe job restart will solve this.

Few minutes passed by. Travis failed once again. The same test failed. I'm getting closer. Now I know that this is something with the Travis environment. Let me check if that also fails on the development branch.

Weird. It works there. The test and the the function haven't changed between the branches. So definitely it's not the issue with the code.

Why only this one particular test failed? Not the others if that's the issue with environment. What makes it so special? Let's inspect that code.

Let's start with the failing test

```ts
describe('when unknown titles are added', () => {
  it('they should be put at the end', () => {
    const mockTitles: Title[] = [
      {
        code: 'dr',
        name: 'Dr.',
      },
      {
        code: 'mrs',
        name: 'Mrs.',
      },
      {
        code: 'rev',
        name: 'Rev.',
      },
      {
        code: 'unknown',
        name: 'Unknown',
      },
      {
        code: 'mr',
        name: 'Mr.',
      },
    ];
    const expectedTitles: Title[] = [
      {
        code: 'mr',
        name: 'Mr.',
      },
      {
        code: 'mrs',
        name: 'Mrs.',
      },
      {
        code: 'dr',
        name: 'Dr.',
      },
      {
        code: 'rev',
        name: 'Rev.',
      },
      {
        code: 'unknown',
        name: 'Unknown',
      },
    ];

    const sortedTitles = mockTitles.sort(sortTitles);

    expect(sortedTitles).toEqual(expectedTitles);
  });
});
```

Nothing complicated. Only some sorting. Let's look at the sorting function.

```ts
import { Title } from '@spartacus/core';

export const titleScores = {
  mr: 1,
  mrs: 2,
  miss: 3,
  ms: 4,
  dr: 5,
  rev: 6,
};

export function sortTitles(title1: Title, title2: Title) {
  if (!titleScores[title1.code] || !titleScores[title2.code]) {
    return 1;
  } else {
    return titleScores[title1.code] - titleScores[title2.code];
  }
}
```

Okay. It only returns integers in that setup. A lot of 1 in this test case. And the failure stated different expected order that the actual one.

Aha!!! Sort doesn't guarantee order preservation! That must have been the issue in this case! But why it changed the order only in this job? Why is it always passing?

Gotcha! I remember that some time ago they changed the sort function implementation in V8. That must be it.

Let's look at what exactly we use on Travis. We are running Node.js 10 on maintenance branch, but Node.js 12 on develop branch.

Let's check when the V8 update got into the Node.js. Version 11. Bingo. That must be it. Let's confirm it. Change version of Node.js locally to 10 and rerun unit tests. Maybe then I would see the issue locally.

What?! Green again. How is it possible?

I'm stupid! Unit test are run with Chrome not the Node :facepalm:

Weird. I don't see any differences in Chrome setup on Travis between maintenance and development branch. Time to check the Travis logs for the chrome setup.
![Chrome install failure on Travis](debugging-travis-issue/chrome-install-failure.JPG)

I'm onto something. Installation of the stable chrome failed in the job. Let's see how it worked previously.
![Chrome install success on Travis](debugging-travis-issue/chrome-install-success.JPG)

Ok. In the previous job Chrome 81 was successfully installed and replaced default Chrome 62. When the V8 change got into Chrome? Let's google.

Chrome 70 landed the fix for sort function. That explains why the test failed in this particular job.

Why on development branch Chrome is installed successfully and why it fails on maintenance branch?

Oh yeah! We changed the OS distribution from trusty to bionic! Let's check if someone also had this problem with Chrome on trusty distro.

Perfect! [https://travis-ci.community/t/travis-is-downloading-older-chrome-versions-in-place-of-chrome-stable/5040/2](https://travis-ci.community/t/travis-is-downloading-older-chrome-versions-in-place-of-chrome-stable/5040/2) Exactly the same issue. But why it happened to us half a year later than for these folks?

I guess maybe Chrome team prolonged trusty distribution support to increase the transition period. I don't have time to dive into what changed in this deb packages over last 2 weeks. I found the issue, fix is easy. Let's just bump the distribution to match the one from development branch and we are green once again. Let's go to the next topic.

Ah. Almost forgot. Let's create a ticket to improve the title util function to work correctly in non deterministic environment as well.

Thanks for reading the story. Hope that's been journey full of surprises for you as well. I've felt great once I figured out the underlying cause of this problem. That's what makes my job satisfying and that's why I love being a programmer.
