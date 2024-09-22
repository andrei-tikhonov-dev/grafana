### GET
```json
{
  "columns": [
    {
      "text": "Team member ID",
      "type": "number",
      "links": null
    },
    {
      "text": "Team member",
      "type": "string",
      "links": null
    },
    {
      "text": "Email",
      "type": "string",
      "links": null
    },
    {
      "text": "Jira ID",
      "type": "string",
      "links": null
    },
    {
      "text": "Internal org ID",
      "type": "string",
      "links": null
    },
    {
      "text": "Hourly rate",
      "type": "number",
      "links": null
    },
    {
      "text": "Yearly hours",
      "type": "number",
      "links": null
    },
    {
      "text": "Team ID",
      "type": "number",
      "links": null
    },
    {
      "text": "Workload ratio",
      "type": "number",
      "links": null
    },
    {
      "text": "Role",
      "type": "object",
      "links": null
    }
  ],
  "rows": [
    [
      1,
      "Alp",
      "alp.bozaci@sbb.ch",
      "JIRAUSER103364",
      "E541822",
      152,
      1760,
      6,
      90,
      {
        "currentRoleId": 1,
        "availableRoles": [
          { "id": 1, "name": "BACKEND" },
          { "id": 2, "name": "FRONTEND" }
        ]
      }
    ],
    [
      2,
      "Sven",
      "sven.birrer@sbb.ch",
      "JIRAUSER12959",
      "E500120",
      152,
      1760,
      6,
      100,
      {
        "currentRoleId": 1,
        "availableRoles": [
          { "id": 1, "name": "BACKEND" },
          { "id": 2, "name": "FRONTEND" }
        ]
      }
    ],
    [
      3,
      "Markus",
      "markus.grabert@sbb.ch",
      "JIRAUSER129822",
      "E548747",
      152,
      1760,
      6,
      100,
      {
        "currentRoleId": 1,
        "availableRoles": [
          { "id": 1, "name": "BACKEND" },
          { "id": 2, "name": "FRONTEND" }
        ]
      }
    ]
  ],
  "type": "table",
  "name": "",
  "meta": {
    "custom": {
      "maxWorkload": 120,
      "availableRoles": [
        { "id": 1, "name": "BACKEND" },
        { "id": 2, "name": "FRONTEND" }
      ],
      "teamId": "someid123"
    }
  }
}

```

### POST (UPDATE)
```json
{
  "memberId": 1,
  "teamId": 123,
  "propertyName": "Column name",
  "value": "John Doe"
}
```

### POST (CREATE)
```json
{
  "email": "john.doe@sbb.ch",
  "internalOrgId": "someorgid1234s",
  "name": "title",
  "role": 1,
  "hourlyRate": 11,
  "yearlyHours": 11,
  "workloadRatio": 11,
  "teamIdsToDetails": {
    "someid123": {
      "role": 1,
      "workload": 11
    }
  }
}

```

### DELETE
```json
{
  "memberId": 1,
  "teamId": 123
}
```