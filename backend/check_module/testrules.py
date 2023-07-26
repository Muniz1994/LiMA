# %%
from model.api import Building
import tkinter.filedialog


# %%
path = tkinter.filedialog.askopenfilename()

# %%
my_building = Building(path)


# %%
els = my_building.select('.IfcSite')


# %%
els[0].mesh.show()

# %%
for el in els:
    print('the area of the space %s is: %s'%(el.ifc.Name,str(el.mesh.section([0,0,1],el.mesh.centroid).to_planar()[0].area)))
