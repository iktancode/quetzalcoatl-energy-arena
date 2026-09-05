# Quetzalcoatl Energy Arena

## A Quetzalcoatl Core case study

**Keep the web. Give it a Universe.**

Quetzalcoatl Energy Arena is an interactive experiment built to test **Quetzalcoatl Core** in a real browser workload.

The Arena remains a normal web application.

It does not implement its own GPU runtime.

---

## Live demo

https://quetzalcoatl-energy-arena-seven.vercel.app/

## Source code

https://github.com/iktancode/quetzalcoatl-energy-arena

## Quetzalcoatl Core

https://www.quetzalcoatlcore.dev/

---

# Why this demo exists

The Arena was created to test the boundary between a regular web application and the Quetzalcoatl runtime.

The application still owns its normal product and game logic.

Quetzalcoatl Core owns the parallel energetic runtime and the supported GPU manifestation.

The goal is not to replace HTML, CSS or JavaScript.

The goal is to let the application remain web-native while Quetzalcoatl adds another runtime layer beside the DOM.

---

# The question

## Who is actually rendering the energetic surfaces?

The application does not contain its own WebGL rendering engine.

It does not manually synchronize DOM geometry with GPU surfaces.

It does not manually manage Crystal projection.

It does not directly run the energetic simulation implemented in Rust/WASM.

Instead, the application describes and updates the web.

Quetzalcoatl observes the participating DOM, creates runtime entities, maintains the Universe, resolves energetic state through Rust/WASM and materializes supported visual responses through Crystal and WebGL2.

---

# What the application knows

The Arena application manages ordinary application logic such as:

- HTML structure
- CSS
- JavaScript
- player state
- enemy state
- spawning
- scoring
- movement
- collision and game rules
- ordinary browser interaction

Conceptually:

```text
HTML
CSS
JavaScript
    ↓
   DOM
```

The Arena can continue thinking in terms of the web.

---

# What the application does not manage

The Arena does not manually implement:

- WebGL scene synchronization
- DOM-to-GPU surface projection
- GPU coordinate synchronization
- Crystal projection
- energetic propagation
- Quetzalcoatl runtime scheduling
- Rust/WASM energetic resolution
- QC scroll-to-GPU synchronization
- GPU surface lifecycle
- Quetzalcoatl wake / evolve / equilibrium / sleep behavior

Those responsibilities belong to Quetzalcoatl Core.

---

# Runtime boundary

```text
Arena application
HTML / CSS / JavaScript
        ↓
       DOM
        ↓
Quetzalcoatl Core
        ↓
DOM Mapper
        ↓
Nahuales
        ↓
Universe
        ↓
Rust / WASM
        ↓
Energy / Relationships / Motion
        ↓
Crystal
        ↓
WebGL2
        ↓
GPU manifestation
```

The application remains responsible for its own behavior.

Quetzalcoatl is responsible for the parallel energetic runtime.

---

# The DOM stays

Quetzalcoatl Core does not require the application to abandon the DOM.

The DOM remains responsible for:

- semantics
- accessibility
- content
- native browser interaction
- layout
- geometric reference

Quetzalcoatl adds:

- Nahuales
- energetic state
- relationships
- Rays
- Rust/WASM resolution
- Crystal projection
- WebGL2 materialization
- demand-driven runtime scheduling

This creates a hybrid model instead of replacing the browser platform.

---

# The central idea

```text
The DOM defines the plane.
The Universe defines the space.

Rays perturb the field.
Nahuales respond through their relationships.
Crystal reveals the result.
```

---

# Interaction

The Arena introduces interaction into the Universe through Rays.

```text
user interaction
      ↓
Interaction Ray
      ↓
Universe perturbation
      ↓
Rust / WASM resolution
      ↓
Nahual response
      ↓
Crystal projection
      ↓
GPU manifestation
```

The application does not need to manually calculate the final GPU displacement of every participating surface.

---

# Runtime lifecycle

Quetzalcoatl Core uses a demand-driven runtime.

```text
quiet Universe
      ↓
    sleep
    no RAF

interaction / runtime change
      ↓
     wake
      ↓
    evolve
      ↓
   manifest
      ↓
 equilibrium?
   /       \
 no         yes
 ↓           ↓
next RAF    sleep
```

Rust determines whether meaningful energetic activity remains.

JavaScript coordinates scheduling and browser integration.

---

# Touch and scroll

Quetzalcoatl does not replace native page scrolling.

```text
touch / page scroll
        ↓
browser keeps native scrolling
        ↓
Crystal temporarily yields
        ↓
DOM remains available
        ↓
viewport and geometry settle
        ↓
Crystal synchronizes
        ↓
projection resumes
```

Touch movement used for scrolling does not need to become a directional energetic Ray.

A tap can remain a localized energetic interaction.

---

# Why this matters

Without a runtime boundary, an interactive application that wants GPU-backed visual behavior can easily become responsible for several unrelated concerns at once:

```text
application logic
+
DOM synchronization
+
GPU state
+
WebGL rendering
+
geometry projection
+
energetic simulation
+
frame scheduling
```

Quetzalcoatl separates those responsibilities.

```text
Arena
→ game logic

Quetzalcoatl
→ parallel runtime

Crystal
→ manifestation
```

---

# What this case study demonstrates

- a normal web application can participate in Quetzalcoatl
- the DOM can remain semantic and interactive
- energetic state can exist outside the DOM
- Rust/WASM can resolve runtime behavior
- Crystal can translate that state into visual projection
- WebGL2 can materialize supported surfaces
- the application does not need its own GPU engine to use the runtime
- the runtime can sleep when energetic work reaches equilibrium
- native browser interaction can remain intact

---

# What this demo does not prove

Quetzalcoatl Core is still experimental.

This case study does **not** claim:

- that Quetzalcoatl is universally faster than the native DOM
- that every DOM element is fully GPU-rendered
- that every CSS feature is currently materialized by Crystal
- that WebGL2 has replaced the browser renderer
- that the current renderer represents the final architecture
- that current performance results apply universally

The Arena is an architectural and interaction experiment.

Controlled performance benchmarking remains a separate task.

---

# Current stack

```text
HTML
CSS
JavaScript
Quetzalcoatl Core
Rust
WebAssembly
Crystal
WebGL2
```

---

# Run locally

```bash
git clone https://github.com/iktancode/quetzalcoatl-energy-arena.git
cd quetzalcoatl-energy-arena
npm install
npm run dev
```

---

# Links

**Live Arena**  
https://quetzalcoatl-energy-arena-seven.vercel.app/

**Source**  
https://github.com/iktancode/quetzalcoatl-energy-arena

**Quetzalcoatl Core**  
https://www.quetzalcoatlcore.dev/

---

## Keep the web.

## Give it a Universe.
