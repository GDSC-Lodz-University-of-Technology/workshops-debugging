---
marp: true
theme: default
paginate: true
---

<style>
  :root {
    --color-background: #ddd;
    --color-background-code: #ccc;
    --color-background-paginate: rgba(128, 128, 128, 0.05);
    --color-foreground: #345;
    --color-highlight: #99c;
    --color-highlight-hover: #aaf;
    --color-highlight-heading: #99c;
    --color-header: #bbb;
    --color-header-shadow: transparent;
  }
</style>

# Devtools: Performance

Some images are directly from https://developer.chrome.com/docs/devtools/performance

It's great source of basic information about how to use devtools. 

There will be few debugMe games to solve. 

---

## When you should use performance tab?

--- 

### When you have performance issues...

Like following: 
* app is unresponsive 
* fans on your laptop turn on when you use app
* animations doesn’t run smooth
* you see animation glitches
* you need know order of execution some JS code
* you want to know when garbage collector is executed

--- 
### Or just...

* You want to discover ugly code without reading it
* make sure how threads/js works
---

# When you should avoid using performance tab

* When you want profile long term app usage - samples are quite big, if they bigger than your RAM it usually just crash [^1]
* When you want know all internal calls, sometimes you need tracing instead of profiler [^2] . For example what is executed in GPU. 

[^1] we will have talk about it later
[^2] there is separate tools for tracing in chrome and is awesome: https://www.chromium.org/developers/how-tos/trace-event-profiling-tool/

---

#### User perception of performance delays

**0 to 100 ms** - Respond to user actions within this time window and users feel like the result is immediate. Any longer, and the connection between action and reaction is broken.
**100 to 1000 ms** - Within this window, things feel part of a natural and continuous progression of tasks. For most users on the web, loading pages or changing views represents a task.
**1000 ms or more** - Beyond 1000 milliseconds (1 second), users lose focus on the task they are performing.
**10000 ms or more** - Beyond 10000 milliseconds (10 seconds), users are frustrated and are likely to abandon tasks. They may or may not come back later.
/p
source: https://web.dev/articles/rail#lighthouse

--- 

### Let's use that!

How to open Performance:
* click on top menu
* open command palette ( command+shift+p and type performance) - it's better way

---

### Welcome screen:

![height:auto](./perfomance/welcome.png)

If some of that numbers are red you should consider run performance profiler 

---


## FPS meter 


---

### What is FPS?
- FPS how many frames are RENDERED. This is based on requestAnimationFrame callback. 
- It's executed every time when old frame is rendered, and new one is ready to render.
- how much time you will have?
    * 1000ms/FPS. For 60hz monitors it will be 16.(6)ms. 


---

## Types of frames
---
![height:auto](./perfomance/fps-types.png)
- Idle Frame - white
    * Indicates periods where no visual updates were required or the main thread was inactive.
- Fully presented frame - green 
    - A complete frame rendered within the budget
    - Occurs when the main thread update finishes before the deadline and the compositor commits it fully
- Partially presented frame (Yellow with dashed pattern)
    - The compositor displayed content without waiting for the main thread update
- Dropped frame - red

--- 

- Focus only on red ones/yellow as JS developer
- No update occurred due to main thread blocking beyond the frame deadline, often caused by long tasks
- It's means that you block main thread longer then rendering time
- you do something wrong - 16ms is a lot of time

--- 
Bonus question - 550ms frames and 233.3ms are green? 
![height:auto](./perfomance/fps-types.png)

---

### Quick demo how it works
switch to devtools with screenshots enabled

---

### debugMe#1

Code will be hidden in next 3 frames after yellow one. 

- hint 1: save screenshots
- hint 2: you can zoom in timeline

---

### DebugMe#1: answer

* ...
* ...
* 127 126 125

--- 

### What you learned?

* performance fps it's great to debug animations, fps drops
* you know how to record performance
* you know how to find key frame types on timeline


## Threads

* performance is not just profiler for JS
* it has profiler for all chromium things, including: 
    * rendering
    * drawing 
    * DOM elements
    * GPU acceleration (like of) 
* you will get most of the data - not all

---

#### Overview of threads view

![height: auto](./perfomance/perfomance-overview.png)

--- 

* task - discrete unit of work executed by the browser's main thread: Javascript execution, DOM updates, layout calculations, Style calculations, painting operations (gray)
    * why it's in main thread?
* Javascript execution (yellow/orange)
* Painting operations - pixel to screen (green) 
* Rendering work including layout and style calculations - Purple
* random colors assigned to different script files - light blue/light pink
* DOM updates - blue


---

### Quick demo how it works

some benchmark: https://www.wirple.com/bmark/

Switch to dev tools and show flame-graph
- bottom-up
- call tree
- event log
- profiler is mapped to sources
- comment on execution
- all that things can be save

--- 

### debugMe#2a

* solution is in the slowest function name with prefix answer

---

### debugMe#2a answer

* ...
* ...
* 44

### debugMe#2b 

* solution will be the fastest function name with prefix answer

---

### debugMe#2b answer

* ...
* ...
* 22


---

### Memory

You can record on timeline memory, but:
* you only will see how many memory is allocated
* helpful to first investigate memory leaks
* useful to see how many things are collected by GC (major and major)
    * it can affect on performance of app

--- 

### debugMe#3 

- find function that allocated much more memory then others
* HINT: run GC before! 

---

### debugMe#3 answer

* ...
* ...
* D

--- 


### Important things about memory graph

* do not use memory graph to debug memory problems
* it's just a hint
* you need manually execute GC to get results 
* documents, node, listeners, gpu memory are useful 
* look at total memory usage

### Extras about performance

- CPU throttling 
- disable js recording 
- manual execute of GC 
- each profile can be be saved for later analysis
    - you can add labels (with shift key)
- you can run it on remote machine and redirect if you run chrome with `--remote-debugging-port=9222` 
- Be cautious with long recordings (crash potential)
- performance like crash - a lot - and sometimes you need to restart whole chrome instance
