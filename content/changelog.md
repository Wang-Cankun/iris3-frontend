---
title: Changelog
description: 'DeepMAPS Changes'
---

# Change Log

All notable changes to DeepMAPS will be documented in this page.

## [0.3] - 04/29/2021
 
### Added

- Allow users to upload custom dataset
- Run custom datasets on single dataset mode, multiple datasets mode, 10x matched scRNA+ATAC-seq mode
- Built Docker images for R and Python backend

### Changes
- Use [JASPAR binding sites database](http://jaspar.genereg.net/genome-tracks/) for motif tasks
- Updated new HGT backend workflow

### Fixed
- API returns too many digits of data
- Replaced example cell label with healthy/disease
- Renamed gene regulatory network title
- Minor typos and layout changes

## [0.2] - 04/15/2021
 
### Added

- Options to select assay in plotting genes and DEGs
- GAS assay and using HGT clusters for default in matched data
- p-value cutoff in DEGs
- Example network and basic settings adjustment using Cytoscape.js
- 7 graph layout algorithms in Cytoscape.js
- Connected HGT logic in backend server
- Coverage plot in matched data
- Enable 'group by' option in generating violin plots
- Enable search function in variable genes table

### Fixed
- Static plot to adjust based on grid item resize event
- Gene-gene correlation function not working

## [0.1] - 04/01/2021

DeepMAPS is online at [https://bmbls.bmi.osumc.edu/deepmaps/](https://bmbls.bmi.osumc.edu/deepmaps/)

### Added
- Allow partial select cell labels or genes for regulon inference
- New homepage UI design
- Redis message queue
- R package for API calling
- Interactive Boxplot & Bar plot