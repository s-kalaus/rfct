# Solution Explanation

After reviewing the code and the task I see 3 problems that should be addressed according to the task:

- the code is in a bit of a mess
- the code is a nightmare to maintain
- everyone is afraid of touching it

Suggested solution was to refactor the code and fix any bugs. What I have figured out is that the code is indeed looks messy, and it is understandable that it was a bit hard to maintain. At the same time the is a solid working solution that was written by experienced (but probably a bit lazy) developer who tried to keep things as compact as possible and deliver it fast. My recommendation is not to touch the code until it is absolutely needed to fix the bugs or add functionality, because:

- Code is compact
- Code is relatively easy to read for people who do not like jumping between many files
- It works

Anyway, from my side, I have identified following problems in the code:
- It is written using plain JS which could be considered as archaic nowdays (potentially this is where "fear of touching it" comes from). Suggestion - use TypeScript.
- Format of all inputs/outputs in functions/methods is not described. No interfaces, even if the same type reused. Suggestion - use TypeScript.
- In the code only Class-based, not Functional components are used. This could lead to problems with new developers who join the project as React declared Functional components as primary way to go and price of maintaining Class-based code will be higher in future, even if we take in account performance penalties. Suggestion - use Functional components.
- Code does not separate business logic, framework logic and presentational layer. This is why it looks messy. Suggestion - move logic away from presentation layer (with help of custom hook).
- Code is simply formatted not correctly - makes it harder to read. Suggestion - use prettier.
- Code is not tested. Maybe this is the main reason why it is hard to modify it as solution looks fragile. Suggestion - cover the code with jest unit tests.
- All code is in 1 file - this is advantage for a reader, but not for a maintainer as it is not easy to identify logical blocks in the code. Suggestion - split the code in different files by purpose.
- Minor suggestions:
  * remove mix of ES6 and older approaches
  * be more functional, not imperative
  * improve code readability byt moving important stuff to the top of files
  * update packages to address potential security issues
  * suggest better project structure that allows later to extend it
  * add some syntax sugar for path aliases - make it look better

Result is in `src/components/EntityHighlighter` folder and contains following highlights:
- Presentational components are in `EntityHighlighter/components` folder
- Framework and business logic is in `EntityHighlighter/hooks` folder + reusable stuff is in `utils` folder
- `EntityHighlighter/index.tsx` plays "container" role
- Each file comes together with a test and whole bundle can be tests with `yarn test` command. Coverage threshold is set to 100%
- Constants are in `EntityHighlighter/consts`
- Global interfaces are in `interfaces` folder
- It is recommended to install and use prettier plugin for IDE to format the code. Or install later husky and add pre-commit hook to run `npm run format:write` command
- React is set to Strict mode to ensure we do not do memory leaks or stale states, see `App.tsx`.
- Regarding bugs - I have fixed some annoying visual problems with selection, plus as result of refactoring some problems with incorrect state management fixed themselves.
