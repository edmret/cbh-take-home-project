# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket CBH-001: **[Spike]** Review database schema relationships between Facilities, Agents, and Shifts

## Description
- Create a diagram of the database schema (if not exists) or update existing diagram to include relationships between Facilities, Agents, and Shifts with the new custom id field (just modify ore create those relationships).

#### Acceptance Criteria
- Diagram of the database schema using [draw.io](https://www.draw.io/) should be created Relationships between Facilities, Agents, and Shifts should be included.
- The Diagram should be uploaded to the repo and a link to the diagram should be included in the ticket.

#### Estimations
-  **__Effort Complexity:__** 1
-  **__Time:__** 3 hours

#### Implementation Details

- Upload Final Diagram to the repo, and include a link to the diagram in the ticket.

### Ticket CBH-002: **[Spike]** Review existing codebase to determine if any changes are needed to support the new custom id field

#### Description
- Review existing codebase to determine if any additional changes are needed to support the new custom id field.
- Review if currently external apps or precess are using the current id field.
- Determine any implementation Risk after the codebase is finished.

#### Acceptance Criteria
- A list of all the files that need to be changed to support the new custom id field should be added to the ticket `CBH-004`.
- Creation of a new tickets per module should be created to support the new custom id field.
- Creation of **Tech-Debt** tickets in case of missing tests in the current codebase.
- Create a new Guide for external apps that were using the current id field, so they can trouble shoot the new changes in the next API version (in Case needed).
- Create a Risk report for unexpected cases that might happen after the codebase is finished and deployed.

#### Estimations
-  **__Effort Complexity:__** 1
-  **__Time:__** 8 hours

#### Implementation Details
- No additional implementations needed.

### Ticket CBH-003: Add the new Custom Id field to the database schema

#### Description
The `Agent` tabkle should have new `custom_id` column, and the existing fieldId should remain in the database, for not loosing previous information, also migration script should be created for doing the renaming and rollback in case any failure.

#### Acceptance Criteria
- The current Agent Table need to have a new field called `custom_id` of type `string` with a max length of 255 characters as primary Key.
- The Current field `id` should be renamed to `internal_id` to avoid confusion, also it should be nullable.
- Script for migration should be created to rename the current `id` field to `internal_id` and rollback in case of any failure.

#### Estimations
-  **__Effort Complexity:__** 1
-  **__Time:__** 6 hours

### Implementation Details
- On the deployment process, the migration script should be executed before the new code is deployed.


### Ticket CBH-004: Edit Codebase to support the new custom id field
#### Description
Codebase changes are needed to support the new custom id field, the following changes are needed:

- The `Agent` model should have a new field called `custom_id` of type `string` with a max length of 255 characters as primary Key.
- The Current field `id` should be renamed to `internal_id` to avoid confusion, also it should be nullable.
- The `getShiftsByFacility` function should be updated to use the new `custom_id` field instead of the current `id` field.
- The `generateReport` function should be updated to use the new `custom_id` field instead of the current `id` field.
- Hide the `internal_id` field from the API response and reports.
- The current files are using the `id` field, so they should be updated to use the new `custom_id` field:
    > /** Files will be added after the ticket `CBH-001` is done. **/

#### Acceptance Criteria

- `getShiftsByFacility` function should not return the `internal_id` field and return the `custom_id` field instead.
- the `generateReport` function should generate report without any refference of the `internal_id` field but the `custom_id` should be displayed.
- Unit tests should be updated to check rthat the correct ID is returned.

#### Estimations
-  **__Effort Complexity:__** 100 (unknown at the moment until `CBH-001`)
-  **__Time:__** 6 hours (unknown at the moment until `CBH-001` but assuming minimum changes are needed for now)

### Implementation Details
- Create V2 API using this changes, and keep the V1 API as it is for now.
- Create a new ticket to remove the V1 API after the V2 API is tested and deployed.
- Test API and external customers for a month using the new guide created in `CBH-002` ticket.