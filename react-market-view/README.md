# Reactive Axon Ivy Market

We introduced the Axon Ivy Market with LE 9.2, with the idea of providing a single point where you can consume connectors, applications and demos to enrich your solutions.

The market is functional, but it has one big drawback: because it was built when only a few products existed, it doesn't scale very well. Especially when many new products will follow in the future (maybe [contributed](https://dev.axonivy.com/link/market-contribute) by you? :)).

I'm Lukas and my goal in the Code Camp 2022 is to improve the existing market view with modern web technologies for a better user experience and scalability.

## The current state of the Axon Ivy Market

Today, the Axon Ivy Market is running integrated into our [dev.axonivy.com](https://dev.axonivy.com/market) site. The page itself uses PHP in the background and Twig for the frontend.

The market page itself is one overview page and the detail views of the single products. And especially the overview page provides not the best user experiance, in my opinion:

- Since it displays all the products directly, they all have to be loaded as well. This leads to a long loading time, during which the user cannot see or do anything.
- filtering is done via query parameters and a refresh of the page. The refresh is triggered after a timeout, after no new input has been made. This doesn't mean, however, that the user may press a new key at that very moment, which will then be lost due to the refresh.

## Vision of a reactive Axon Ivy Market

The modern Axon Ivy Market should at least attack the biggest user experience problems like filtering. This with [React](https://reactjs.org) as web technology.

But let's see how far I will get.
