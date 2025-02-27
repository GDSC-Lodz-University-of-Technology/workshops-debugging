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
# Devtools: Memory

## When you should use memory tab?

---

### When you have memory issues...

Like following:
* app is unresponsive afer some time
* app working slower after few minutes of usage
* if you create some kiosk mode app and want avoid crashes
* if you develop any app and want save time in future 
* when opening 7 tabs of your app is imposible without high end PC 
* mobile apps crashes
---

### Or just...

* Want know what is allocated when
* see how v8 optimize memory

---

#### User perspective a little history
Github in 2018: github - 7.41 MB
Github now: 22.3 MB<D-O>

Google results in 2018: 14.77
Google now: 48MB on firefox

about:blank has around 1.3MB without extensions

Source list of memory usage of popular sites in 2018:
https://github.com/dominictarr/your-web-app-is-bloated?tab=readme-ov-file#table-of-contents

---
### Why memory affects on perfomance?

- allocating new things take time
- clearing new things take more time
- heap that is 22MB dosn't mean it took 22MB of memory - it's only JS heap

--- 




### Few important things about v8 memory managment

- heap memory - where v8 stores dynamic data (array/objects)
    - new space (young generation) - clear by minor GC
    - old space (old generation) - clear by Major GC
    - code space - stories compiled code
- stack memory - where v8 stores primitvies

---
### Describe UI of Memory tab

--- 

### When use what? 

- HEAP snapshot - for compare and check all heap elements in memory (gc is executed on each recording)
- Allocation on timeline - for short recording of live application with garbage collector preview
- allocation sampling - when you want check what allocate that memory
- detached elements

- select Javascript VM instance - for live view of how much kB of memory is allocated / unallocated

---

### Tips for investigating memory problems 
- do same task two times. Record only second
- take two snapshots and compare size
- use https://github.com/facebook/memlab if you want create tests related to memory

---

### memory debugMe
