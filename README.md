## 📌 Project Description

The application loads and displays a list of countries, allowing users to filter, search, and sort them. The main focus of this task is optimizing performance using `React.memo`, `useMemo`, and `useCallback`.

---

### 📊 Profiling Results of Filter By Region

#### 🧪 Actions Performed

- Clicked on the region Select dropdown
- Selected a specific region (e.g., "Americas") to filter the country list

#### ✅ Summary of Observations

- All components in the filtering panel (`Select`, `CountryFilteringPanel`, `SearchInput`) re-rendered during both interactions
- `CountryList` and its 250 `CountryListItem` children were re-rendered on both dropdown interaction and region selection
- Re-renders were primarily caused by unstable props (`onChange`, `onClick`) and object references
- Overall commit duration exceeded **150 ms**, mostly due to redundant re-renders of country list items

The detailed performance metrics are shown below.

| Interaction    | Component               | Render Reason (Before)                                    | Render Reason (After) | Render Duration (Before) | Render Duration (After) | Commit Duration (Before) | Commit Duration (After) |
| -------------- | ----------------------- | --------------------------------------------------------- | --------------------- | ------------------------ | ----------------------- | ------------------------ | ----------------------- |
| Click dropdown | `CountryList`           | Updated `sortConfig`, `selectedRegion`, rerendered parent |                       | \~32.8 ms                |                         | \~32.8 ms                |                         |
|                | `CountryListItem` (250) | Re-created `visitCountry` callback                        |                       | \~0.3–0.4 ms per item    |                         | \~80 ms total            |                         |
|                | `CountryFilteringPanel` | Updated `sortConfig` object and `onRegionChange` callback |                       | \~1 ms                   |                         | \~1 ms                   |                         |
|                | `Select` (3)            | New `onChange` handlers and changing `value` props        |                       | \~0.2–0.4 ms each        |                         | \~1 ms total             |                         |
|                | `SearchInput`           | New `onChange` from parent                                |                       | \~0.4 ms                 |                         | \~0.4 ms                 |                         |
| Select region  | `CountryList`           | Filtered countries list changed (`useMemo`)               |                       | \~39.8 ms                |                         | \~39.8 ms                |                         |
|                | `CountryListItem` (250) | Newly created `onClick`                                   |                       | \~0.3–0.4 ms per item    |                         | \~80 ms total            |                         |
|                | `CountryFilteringPanel` | Prop changes from parent                                  |                       | \~1 ms                   |                         | \~1 ms                   |                         |
|                | `Select` (3)            | Change in `value` and non-memoized `onChange`             |                       | \~0.2–0.4 ms each        |                         | \~1 ms total             |                         |
|                | `SearchInput`           | New `onChange` from parent                                |                       | \~0.4 ms                 |                         | \~0.4 ms                 |                         |

---

### 🖼️ Visual Chart Comparison

| View                        | Before Optimization                  | After Optimization            |
| --------------------------- | ------------------------------------ | ----------------------------- |
| 🔥 Flame Graph – Click      | ![alt text](./src/assets/image.png)  | _No re-renders observed_      |
| 🔥 Flame Graph – Selection  | ![alt text](./src/assets/image2.png) | _(Insert after optimization)_ |
| 📈 Ranked Chart – Click     | ![alt text](./src/assets/image3.png) | _No re-renders observed_      |
| 📈 Ranked Chart – Selection | ![alt text](./src/assets/image4.png) | _(Insert after optimization)_ |
| 🕒 Timeline                 | ![alt text](./src/assets/image5.png) | _No re-renders observed_      |

---
