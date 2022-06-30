from fastapi import FastAPI, Depends

import pandas as pd
from pandas import DataFrame
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def read_csv():
    """
        This is a placeholder function where I am mocking the data
        You will wire your real data source here
    """

    data: DataFrame = pd.read_csv("manual_harvest_grid.csv")

    # Take the sentences from the frame, and use it for the table
    # You will populate this from the correct location
    sentences = data['sentence'].drop_duplicates().tolist()

    # Build the heatmap from the categorical columns. I mocked this based on the screenshot
    row_names = "other proportions processes decisions conditions".split()
    col_names = "equipment labor bird weather cost time seeding credit land otherr".split() # I guess otherr is not a typo but a way to distinguish it from the homonim row

    # I will compute each cell's value as the ratio of row/col co-occurence by the number of rows in the table
    heat_map = {r:{c:0. for c in col_names} for r in row_names}
    for ix, item in data.iterrows():
        for row_name in row_names:
            for col_name in col_names:
                if item[row_name] == 1 and item[col_name] == 1:
                    heat_map[row_name][col_name] += 1

    for row in heat_map.values():
        for c in row:
            row[c] /= len(data)

    return {
        "sentences": sentences,
        "grid": heat_map
    }


@app.get("/data")
def root(data: DataFrame = Depends(read_csv)):
    return data


@app.get("/drag/{row}/{col}/{sent}")
async def drag(row: str, col: str, sent: str):
    """ This is the handler for the drag & drop events. Update your data as you see fit here """
    message = f"Row: {row}\tCol: {col}\tText: {sent}"
    print(message)
    return message

