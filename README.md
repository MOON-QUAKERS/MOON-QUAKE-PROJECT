
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)

## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Usage](#usage)
* [Screenshots](#screenshots)
# MOON QUAKER

Space Apps Challenge 2022 PoC for the Team Moon Quaker

index.html contains the main layout and definitions

OrbitControls.js is grabbed from the THREE.js library and used for adding rotation and abstraction to function calls.

*.csv contains seismic activity on the moon in Lat/Long coordinates.

lroc_color_poles_16k.jpeg is a RGB image which is used for providing the basic map/texture of the moons surface.
It is achieved by creating a mesh, adding this image as a texture to the mesh and adding the entire mesh to the sphere representing the moon.
Which automatically wraps the image around the moons surface.
NB! this creates more severe distortion the further diagonally one moves from origo, (Lat/Long coordinates [0,0]). This is shown easily around the pole areas.

ldem_64_uint.jpeg is a DEM image which is used as a mask for adding height with bumpMap in the map mesh.
This gives the texture layer (surface) some degree of height textures.

planet.js is the main software, it runs a simple spehere generator, adding a camera and light which is attached to the camera.
Then it generates a mesh and adds the surface image as a texture layer onto the mesh. Further it adds the DEM image as a texture for the bumpMap providing height differentials on the surface.
Lastly it adds the mesh onto the sphere, wrapping it around the sphere representing the moon, before rendering the sphere in the browser window as a 3D object while rotating it.

main.ipynb is a Jupyter notebook for generating images of seismic activity based on lat/long coordinates.
It converts lat & long to X,Y in the image of Xm,Ym, and returns a binary mask of the image layout to be used on generating overlays / other image processing.


## Demo




## Authors

- [@martamateu](https://github.com/martamateu)


## Documentation


[3d-moon-demo-in-webgl-and-javascript documentation](http://coryg89.github.io/technical/2013/06/01/photorealistic-3d-moon-demo-in-webgl-and-javascript/)

[Threejs documentation](https://dustinpfister.github.io/2021/06/10/threejs-examples-sphere-mutate/)

[GIS data](https://repository.hou.usra.edu/handle/20.500.11753/1719)

[Paper - Improving the accessibility of the apollo seismic data: archiving at iris and
the pds ](https://www.hou.usra.edu/meetings/lpsc2020/pdf/2269.pdf)

[XML - Data Documentation](https://pds-geosciences.wustl.edu/lunar/urn-nasa-pds-apollo_seismic_event_catalog/data/nakamura_2005_dm_locations.xml)

[Apollo 11 Seismic Experiment](https://moon.nasa.gov/resources/13/apollo-11-seismic-experiment/)



## Graph data

![Shallow_moonquake](https://raw.githubusercontent.com/MOON-QUAKERS/MOON-QUAKE-PROJECT/main/Shallow_moonquake.png)


## Appendix

Any additional information goes here


## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express


## Optimizations

What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility

